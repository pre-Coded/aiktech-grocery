import React, { useState } from 'react'
import { ContentCard } from '../AddProdcut/AddProduct'
import './AddCategory.scss'

const AddCategory = () => {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <div className='add-category-container flex-column flex-1'>

      <div className='add-category-wrapper flex-column'>

        <div className='flex-row gap-10 flex-1'>

          <div className='search-tab input-border smaller-input-padding flex-1'>
            <input
              type={'search'}
              placeholder="Search Category..."
            />
          </div>

          <button className='add-btn btn-none btn'>
            {`Add Category`}
          </button>

        </div>

        <section className='category-product flex-row gap-10 flex-1' style={{ minHeight: '100%' }}>

          <div className='category-subcategory flex-column gap-10 overflow-scroll flex-1 relative' style={{height : '40rem', padding : '0 10px', paddingBottom : '4rem'}}>

            <div style={{position: 'sticky', top : '0', backgroundColor : 'white', zIndex : '100'}}>
              All Category and SubCategory
            </div>


            <ContentCard 
              cardId = {1}
              categoryId = {categoryId}
              onClick={() => {
                if(categoryId === 1) setCategoryId(null);
                else setCategoryId(1)
              }}
            />
            <ContentCard 
              cardId = {2}
              categoryId = {categoryId}
              onClick={() => {
                if(categoryId === 2) setCategoryId(null);
                else setCategoryId(2)
              }}
            />
            <ContentCard 
              cardId = {3}
              categoryId = {categoryId}
              onClick={() => {


                if(categoryId === 3) setCategoryId(null);
              
                else setCategoryId(3)
              }}
            />
            <ContentCard 
              cardId = {4}
              categoryId = {categoryId}
              onClick={() => {

                if(categoryId === 4) setCategoryId(null);
                else setCategoryId(4)
              }}
            />
          </div>

          <div className='product flex-1 flex-column gap-10 overflow-scroll' style={{padding : '0 10px', height : '40rem'}}>
            <div style={{position: 'sticky', top : '0', backgroundColor : 'white', zIndex : '100'}}>
              All Product
            </div>
            <ContentCard 
              cardId={323}
            />
            <ContentCard 
              cardId={323}
            />
          </div>
        </section>

      </div>
    </div>
  )
}

export default AddCategory