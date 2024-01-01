import React, { useState, useRef, useEffect, useMemo } from 'react'
import './AddCategory.scss'
import { BsThreeDotsVertical } from "react-icons/bs";
import HoverComponent from '../../../Components/HoverComponent/HoverComponent';
import { ContentCard } from '../AddProdcut/AddProduct';
import { Modal } from '../../../Components';
import Select from "react-select";



const AddCategory = ({ categories }) => {

  const [selectedCardId, setSelectedCardId] = useState(null);

  const [productList, setProductList] = useState({
    subCategoryName : null,
    data : null,
  });


  const handleProductChange = (event, data) => {
    event.stopPropagation();
    
    console.log("clicked", data)

    if(data.data?.length === 0){
      setProductList({
        subCategoryName : data.name, 
        data : null,
      })

      return;
    }

    setProductList({
      subCategoryName : data.name,
      data : data.data
    });

  }
  
  const [searchText, setSearchText] = useState("")

  const originalCategories = categories;
  

  // handling searchPart

  categories = useMemo(() => {
      if (searchText === null || searchText.length === 0 || searchText === "") {
          return originalCategories;
      }

      return originalCategories.filter((item) => {
          return item?.name.toLowerCase().includes(searchText.toLowerCase());
      })

  }, [searchText])

  const [addOrEditModal, toggleAddOrEditModal] = useState(false);

  const [productForm, setProductForm] = useState({
      id : "",
      password : "",
  })

  // Modal View and toggleEdit Button
  const handleToggleModal = () => {
    toggleAddOrEditModal(prev => !prev);
  }

  const handleEditButton = (data) => {
      console.log("clicked edit", data)

      setProductForm({
          
          name : data.product_name || data.name,
          description: data.description,
          home_page: data.home_page,
      })

      handleToggleModal();
  }

  const handleFormInput = (e) => {
      setProductForm( prev => ({
          ...prev, 
          [e.target.name] : e.target.value
      }))
  }


  return (
    <div className='add-category-container flex-column flex-1'>

      {
        addOrEditModal && 
        <Modal 
            show={addOrEditModal}
            onClick={handleToggleModal}
        >
            
            <input placeholder='Enter name' name="name" value={productForm.name} onChange={handleFormInput}/>
            <input placeholder='Enter description' name="description" value={productForm.description} onChange={handleFormInput}/>
            <label htmlFor='home_page'>show this on home page</label>
            <input placeholder='show this on home page' type='checkbox' id='home_page' name="home_page" value={productForm.home_page} onChange={handleFormInput}/>
            
           
            <input type={'button'} value="Submit"/>

            <button className='btn-none' onClick={handleToggleModal}>Discard</button>
        </Modal>
      }

      <div className='add-category-wrapper flex-column'>

        <div className='flex-row gap-10 flex-1'>

          <div className='search-tab input-border smaller-input-padding flex-1'>
            <input
              type={'search'}
              placeholder="Search Category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <button className='add-btn btn-none btn' onClick={handleToggleModal}>
            {`Add More`}
          </button>

        </div>

        <section className='category-product flex-row gap-10 flex-1'>

          <div className='category-subcategory flex-column gap-10 overflow-scroll flex-1 relative' style={{ height: '40rem', padding: '0 10px', paddingBottom: '4rem', minWidth : '60%' }}>

            <div className='text-large text-bold-md'>
              All Category and SubCategory
            </div>

            {

              categories.length !== 0 && categories.map( (category) => (
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
                  selectSubCategory={handleProductChange}
                  categoryCard
                />
              ))
            }

          </div>

          <div className='product flex-1 flex-column gap-10 overflow-scroll' style={{ padding: '0 10px', height: '40rem' }}>
            <div className='flex-row items-center justify-between'>
              <span className='text-large text-bold-md'>
                {productList.subCategoryName || "Choose A Category"}
              </span>
            </div>
            {
              productList.data?.length > 0 ?
              
              productList.data.map((product, index) => (
                <ContentCard 
                  key={index} 
                  cardId={product.id}
                  data={product} 
                  editFunction={handleEditButton}
                  categoryCard
                />
              ))

              :

              <span className='text-medium text-bold-sm'>No Products To Show</span>
            }

          </div>
        </section>

      </div>
    </div>
  )
}

export default AddCategory