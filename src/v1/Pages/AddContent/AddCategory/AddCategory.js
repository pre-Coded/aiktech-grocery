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


const AddCategory = () => {
  const [categories, setCategories] = useState([])
  const [fullCategoryList, setFullCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [productList, setProductList] = useState({
    subCategoryId : null, 
    subCategoryName : null,
    data : null,
  });

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


  const handleProductChange = (event, data) => {
    event.stopPropagation();
    

    if(data.data?.length === 0){
      setProductList({
        subCategoryName : data.name, 
        data : null,
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
        return item?.product_name.toLowerCase().includes(searchText.toLowerCase())
    })

    setCategories(filterItem);
  }


  const [addOrEditModal, toggleAddOrEditModal] = useState(false);
  const [addProductModal, toggleAddProductModal] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
      id : "",
      password : "",
  })

  // Modal View and toggleEdit Button
  const handleToggleModal = () => {
    toggleAddOrEditModal(prev => !prev);
  }

  const handleEditButton = (data) => {
      console.log("clicked edit", data)

      setCategoryForm({
          name :  data.name,
          description: data.description,
          home_page: data.home_page,
          id: data.id
      })

      handleToggleModal();
  }

  const handleDelete = (data) => {
    if(data?.id === "category"){
      setCategories(data?.data)
      setFullCategoryList(data?.data)
    }

    if(data?.id === "productFromSub"){
      setProductList(prev => ({
        ...prev,
        data : data?.data
      }))
    }

  }

  const [productForm, setProductForm] = useState({
    product_name : "",
    packaging_price: "",
    description: "",
    sku: "",
    category: null,
    id: null,
  })

  const handleEditSuccess = (data) => {
    if(data.id === "category"){
      setCategories(data.data);
      setFullCategoryList(data.data);
    }

    if(data.id === "product"){
      setProductList((prev) => ({...prev, data : data.data}))
    }
  }


  return (
    <div className='add-category-container flex-column flex-1'>

      {
        addOrEditModal && 
        <Modal 
            show={addOrEditModal}
            onClick={handleToggleModal}
        >
          <AddCategoryModal closeModal={handleToggleModal} category={categoryForm} handleResponse ={ handleEditSuccess }/>
        </Modal>
      }

      {
        addProductModal && 
        <Modal 
          show={addProductModal}
          onClick={() => toggleAddProductModal(false)}
        >
          <AddProductModal closeModal={() => toggleAddProductModal(false)} product={productForm} handleResponse ={ handleEditSuccess }/>
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
                <button className='add-btn btn-none btn-outline' onClick={()=>{
                  handleToggleModal();
                  setCategoryForm(null)
                }}>
                  {`Add More`}
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

                <button className='btn-none btn-outline' onClick={() => toggleAddProductModal(true)}>
                  Add Product
                </button>
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