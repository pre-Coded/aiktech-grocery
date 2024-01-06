import React, { useState, useRef, useEffect, useMemo } from 'react'
import './AddCategory.scss'
import { BsThreeDotsVertical } from "react-icons/bs";
import HoverComponent from '../../../Components/HoverComponent/HoverComponent';
import { Modal } from '../../../Components';
import ContentCard from '../ContentCards';
import AddCategoryModal from '../AddProdcut/AddCategoryModal';
import { dashboardAPI } from "../../../Api/index.js";
import Loader from '../../../Components/Loader';
import { toast } from 'react-toastify';

import AddProductModal from '../AddProdcut/AddProductModal';
import { fetchTenantUsers } from '../../../Api/authAPI.js';
import { fetchCategoryProducts } from '../../../Api/productAPI.js';
import axios from 'axios';
import { getBaseUrl } from '../../../Lib/NetworkHandler.js';

import data from '../../../Assets/DummyData.json'

import Select from 'react-select';
import LinkProduct from './LinkProduct';

const AddCategory = () => {
  
  const [categories, setCategories] = useState([])
  const [fullCategoryList, setFullCategoryList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [productList, setProductList] = useState({
    subCategoryId : null, 
    subCategoryName : null,
    data : null,
  });

  const [checkAddSubCategory, setCheckAddSubCategory] = useState(false);
  const [linkProductModal, toggleLinkProductModal] = useState(false);
  const linkProductRef = useRef(null);

  const fetchItem = async () => {
    try{
        const response = await dashboardAPI.fetchTenantCategories();
        setCategories(response.data);
        setFullCategoryList(response.data)
    }catch(e){
        toast.error("Failed in fetching categories.", 1000)
    }

    setLoading(false);
  }

  useEffect(async ()=>{
    fetchItem();
  },[])

  const fetchSpecificProduct = async () => {
    try{
      if(productList.subCategoryId !== null){
        const input = {name : productList.subCategoryName, id : productList.subCategoryId }
        const response = await axios.post(`${getBaseUrl()}/api/shop/category/product/`,input);
        const data = response.data.data;
        setProductList( prev => ({...prev , data : data }));
      }
    }catch(er){
      toast.error("Error in fetching products");
    }
  }

  useEffect(async () => {
    fetchSpecificProduct();
  }, [productList.subCategoryId, categories])


  const handleProductChange = (event, data) => {
    event.stopPropagation();
    
    if(data.data?.length === 0){
      setProductList({
        subCategoryId : data.id,
        subCategoryName : data.name,
        data : []
      })

      return;
    }

    setProductList({
      subCategoryId : data.id,
      subCategoryName : data.name,
      data : data.data
    });

  }

  // handling searchPart
  const handleChange = (e) => {
    const searchText = e.target.value;

    if (searchText === null || searchText.length === 0 || searchText === "") {
        setCategories(fullCategoryList);
        return;
    }

    const filterItem = fullCategoryList.filter((item) => {
        return item?.name.toLowerCase().includes(searchText.toLowerCase())
    })

    setCategories(filterItem);
  }


  const [addOrEditModal, toggleAddOrEditModal] = useState(false);
  const [addProductModal, toggleAddProductModal] = useState(false);

  const [categoryForm, setCategoryForm] = useState(null)

  // Modal View and toggleEdit Button
  const handleToggleModal = () => {
    toggleAddOrEditModal(prev => !prev);
  }

  const handleEditButton = (data) => {
      setCheckAddSubCategory(false);

      setCategoryForm({
          name :  data.name,
          description: data.description,
          home_page: data.home_page,
          id: data.id
      })

      handleToggleModal();
  }

  const handleDelete = (data) => {

    if(data?.type === "category" || data?.type === "subcategory"){

      const newCategoryList = fullCategoryList.reduce( (array, item) => {

        if(item.id !== data.cardId){

          let subCategory = item.sub_categories.filter((item) => item.id !== data.cardId);
          
          item["sub_categories"] = subCategory;
          array.push(item);

        }
      
        return array;
      }, [])

      setCategories(newCategoryList)
      setFullCategoryList(newCategoryList)

      setProductList({
        subCategoryId : null, 
        subCategoryName : null,
        data : null,
      })

    }

    if(data?.type === "productFromSubCat" || data?.type === "productFromCat"){

      const catOrSubCatID = data.catOrSubCatId;

      const newCategoryList = fullCategoryList.reduce( (cat, catItem) => {

        if(catItem.id !== catOrSubCatID){

          let newSubcategory = catItem.sub_categories.reduce( (subCat, subCatItem) => {

            if(subCatItem.id === catOrSubCatID){

              const newProductList = subCatItem.products.filter((item) => item.id !== data.cardId);

              subCatItem["products"] = newProductList;
            }

            subCat.push(subCatItem);

            return subCat;
          }, [])
          

          cat["sub_categories"] = newSubcategory;
          cat.push(catItem);

        }else{
          const newProductList = catItem.products.filter((item) => item.id !== data.cardId);

          catItem["products"] = newProductList;

          cat.push(catItem);
        }
      
        return cat;
      }, [])

      setCategories(newCategoryList);
      setFullCategoryList(newCategoryList); 
    }
  }

  const [productForm, setProductForm] = useState({
    product_name : "",
    packaging_price: "",
    description: "",
    sku: "",
    category: null,
    id: null,
    categoryId : productList.subCategoryId, 
  })


  const handleEditSuccess = (data) => {
    console.log(data,"response data");

    if(data.type === "category"){
      // checkAddSubCategory state will be used to find, whether to add new data to category or subCategory
      const catOrSubCatID = data.itemId;

      let newCategoryAdded = true;
      const newCategoryList = fullCategoryList.reduce(( newCat , cat) => {
        if(cat.id === catOrSubCatID){
          cat = data.data;

          if(newCategoryAdded) newCategoryAdded = false;
        }else{

          let newSubCatAdded = true;
          const newSubCat = cat.sub_categories.reduce((newSub, sub) => {
            
            if(sub.id === catOrSubCatID){

              sub = data.data;
              if(newSubCatAdded) newSubCatAdded = false;
            }

            newSub.push(sub);

            return newSub;
          }, [])

          if(newSubCatAdded && checkAddSubCategory) newSubCat.push(data.data);

          cat["sub_categories"] = newSubCat;
        }

        newCat.push(cat);
        return newCat;
      }, []);

      if(newCategoryAdded && !checkAddSubCategory) newCategoryList.push(data.data);

      setCategories(newCategoryList);
      setFullCategoryList(newCategoryList);
    }

    if(data.type === "product"){

      const catOrSubCatID = productList.subCategoryId;

      const newCategoryList = fullCategoryList.reduce(( newCat , cat) => {

        if(cat.id === catOrSubCatID){

          let newProductAdded = true;

          const newProductList = cat.products.map((item) => {
            if(item.id === data.itemId){

              if(newProductAdded) newProductAdded = false;

              return data.data;
            }

            return item;
          })

          if(newProductAdded) newProductList.push(data.data);

          cat["products"] = newProductList;
        }else{

          const newSubCat = cat.sub_categories.reduce((newSub, sub) => {
            
            if(sub.id === catOrSubCatID){

              let newProductAdded = true;

              const newProductList = sub.products.map((item) => {
                if(item.id === data.itemId){
    
                  if(newProductAdded) newProductAdded = false;
    
                  return data.data;
                }
    
                return item;
              })
    
              if(newProductAdded) newProductList.push(data.data);

              sub["products"] = newProductList;
            }

            newSub.push(sub);

            return newSub;
          }, [])

          cat["sub_categories"] = newSubCat;
        }

        newCat.push(cat);

        return newCat;
      }, []);

      setCategories(newCategoryList);
      setFullCategoryList(newCategoryList);
    }
  }

  const addSubcategory = (data) => {
    setCheckAddSubCategory(true);
    setCategoryForm(null)
    toggleAddOrEditModal(true);
  }

  // handleProductLink


  return (
    <div className='add-category-container flex-column flex-1'>

      {
        addOrEditModal && 
        <Modal 
            show={addOrEditModal}
            onClick={handleToggleModal}
        >
           <AddCategoryModal 
            closeModal={handleToggleModal}  
            category={categoryForm} 
            category_id={productList.subCategoryId}
            handleResponse ={ handleEditSuccess } 
            name={checkAddSubCategory}
            />
        </Modal>
      }

      {
        addProductModal && 
        <Modal 
          show={addProductModal}
          onClick={() => toggleAddProductModal(false)}
        >
          
          <AddProductModal 
            closeModal={() => toggleAddProductModal(false)}  
            handleResponse ={ handleEditSuccess }
            categoryId={productList.subCategoryId} 
            addProductToCat={true}
            />
        </Modal>
      }

      {
        loading ? 

        <div className="flex-1 flex-row place-item-center">
            <Loader />
        </div> 
        
        :  

        <div className='add-category-wrapper flex-column'>

            <div className='flex-row gap-10 flex-1'>

              <div className='search-tab input-border small-input-padding flex-1'>
                <input
                  type={'search'}
                  placeholder="Search Category..."
                  onChange={handleChange}
                />
              </div>
            </div>

          <section className='category-product flex-row gap-10 flex-1'>

            <div 
              className='category-subcategory flex-1 overflow-scroll' 
              
              style={{ 
                  height: '40rem',
                  padding: '0 10px', 
                  paddingBottom: '4rem', 
                  minWidth : '60%' 
              }}>

              <div className='flex-row justify-between' style={{paddingBottom : '1rem'}}>
                <span className='text-large text-bold-md flex-row'>
                  Category and Subcategory
                </span>
                <button className='add-btn btn-none btn-primary' onClick={()=>{
                  setCheckAddSubCategory(false);
                  handleToggleModal();
                  setCategoryForm(null)
                }}>
                  {`Add Cateogory`}
                </button>
              </div>

              {

                categories.length !== 0 ?
                categories.map( (category) => (
                  <ContentCard
                    key={category.id}
                    cardId={category.id}
                    selectedCardId={selectedCardId}
                    data={category}

                    onClick={ (e) => {
                        e.stopPropagation();
                        setSelectedCardId(category.id);
                    }}

                    editFunction={handleEditButton}

                    deleteCard ={ {
                      itemName : 'category',
                      response : handleDelete,
                    } }

                    deleteSubCategory ={{
                      itemName : 'subcategory',
                      response : handleDelete
                    }}

                    addSubcategory = {addSubcategory}

                    selectSubCategory={handleProductChange}

                    width={"100%"}
                  />
                )) : 
                <div className='text-small text-bold-sm flex-1 flex-row place-item-center'>
                    No Categories to show
                </div>
              }

            </div>

            <div className='cat-sub-product flex-1 overflow-scroll' style={{ padding: '0 10px', height: '40rem', }}>

              <div className='flex-row justify-between items-center' style={{paddingBottom : '1rem'}}>
                <span className='text-large text-bold-md'>
                  {productList.subCategoryName?.toUpperCase() || "Product"}
                </span>

                <div className='flex-row items-center gap-10'>
                  <button 
                    className='btn-none btn-primary' 
                    onClick={() => {toggleAddProductModal(true)}}
                  >
                    Add Product
                  </button>
                  {
                    productList.subCategoryId !== null &&
                    <div
                      ref={linkProductRef}
                      className="relative"
                    >
                      <button 
                        className='btn-none btn-outline' 
                        onClick={() => {
                          toggleLinkProductModal(prev => !prev);
                        }}
                      >
                        Link Product
                      </button>

                      {
                        linkProductModal && 
                        <HoverComponent 
                          hoverRef={linkProductRef}
                          style={{
                              backgroundColor : '#f2f2f2',
                              width : '20rem',
                              height : '10rem'
                          }}
                          onMouseLeave={() => {
                            toggleLinkProductModal(prev => !prev);
                          }}
                        >
                          <LinkProduct 
                            categoryId = {productList.subCategoryId}
                            fullCategoryList = {fullCategoryList}
                            setCategories = {setCategories}
                            setFullCategoryList = {setFullCategoryList}
                            closeModal = {toggleLinkProductModal}
                          />
                        </HoverComponent>
                      }
                    </div>
                  }
                </div>
              </div>

              {
                productList.data?.length > 0 ?
                
                (
                  productList.data.map((product, index) => (
                    <ContentCard 
                      key={index} 
                      cardId={product.id}
                      data={product} 

                      deleteCard ={ {
                        itemName : 'productFromSubCat',
                        response : handleDelete,
                      } }

                      subCategoryId ={ productList.subCategoryId }

                      width ={"100%"}
                      productCard
                    /> 
                  ))
                )
                :
                <div className='text-small text-bold-sm flex-1 flex-row place-item-center'>No Products To Show</div>
              }

            </div>
          </section>
        </div>
      }
    </div>
  )
}

export default AddCategory;