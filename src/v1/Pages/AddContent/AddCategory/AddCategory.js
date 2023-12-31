import React, { useState,useRef, useEffect } from 'react'
import './AddCategory.scss'
import { BsThreeDotsVertical } from "react-icons/bs";
import HoverComponent from '../../../Components/HoverComponent/HoverComponent';
import { ContentCard } from '../AddProdcut/AddProduct';

const CategoryCard = (props) => {
  const editRef = useRef(null);
  console.log(props.product,"product");

  const [showEditBtn, toggleEditBtn] = useState(false);

  return (
      <div 

          className='content-card-container'
          onClick={props.onClick}    
      >
          <div className='content-card-wrapper flex-column'>

              <button
                  className='content-card-edit btn-none'
                  onMouseEnter={() => toggleEditBtn(true)}
                  onMouseLeave={() => toggleEditBtn(false)}
                  ref={editRef}
              >
                  <BsThreeDotsVertical fontSize={'1.5rem'} color={"black"} />
                  {
                      showEditBtn &&
                      <HoverComponent
                          hoverRef={editRef}
                      >
                          <div className='flex-column gap-10'>
                              <button
                                  className='btn-none nowrap'
                              >
                                  Edit
                              </button>
                              <button
                                  className='btn-none nowrap'
                              >
                                  Delete
                              </button>
                          </div>
                      </HoverComponent>
                  }
              </button>

              {/* <div className='content-card-img'>

              </div> */}

              <div className='content-card-details'>

                  <ul className='content-card-ul ul-style-none flex-column'>
                      <li className='flex-row gap-10 text-bold-md text-medium'>
                          <span className='content-card-img'>

                          </span>

                          <div className='flex-column'>
                              <span
                                  className='product-title text-bold-md text-medium'
                                  style={{
                                      maxHeight: '2rem',
                                  }}
                              >
                                  {props.category && props.category.name}
                              </span>
                             


                              {/* <span className='text-bold-sm text-small'>Unit :</span>
                              <span className='text-bold-sm text-small'>Packaging : </span>
                              <span className='text-bold-sm text-small'>Sku :</span>

                              <span className='flex-row justify-between'>
                                  <span className='text-bold-sm text-small'> Activate Product : </span> <ImCheckboxUnchecked style={{ maxWidth: '2rem' }} />
                              </span>
                              <span className='flex-row'>
                                  <span className='text-bold-sm text-small'> Activate Description : </span>  <ImCheckboxUnchecked style={{ maxWidth: '2rem' }} />
                              </span>
                              <span className='flex-row'>
                                  <span className='text-bold-sm text-small'> Has Variation : </span> <ImCheckboxUnchecked style={{ maxWidth: '2rem' }} />
                              </span> */}
                          </div>
                      </li>
                  </ul>

              </div>
          </div>

          {
               props.category && (props.category.id === props.categoryId) ? 
                  <div className='subcategory-container border' style={{minHeight : '20rem'}}>
                    {
                      props.category.sub_categories.map((sub_category, index)=>(
                        <CategoryCard category={sub_category} key={index} />
                      ))
                    }
                      
                  </div>
              : 

              <div>
              </div>
          }
      </div>
  )
}

const AddCategory = ({categories}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([])
  console.log(products,"products of categories");
  useEffect(()=>{
    if(categoryId){
      console.log(categories.filter((cat)=>{return cat.id===categoryId})[0]);
      setProducts(categories.filter((cat)=>{return cat.id===categoryId})[0].products)
    }

  },[categoryId])


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

          {
            
            categories.length!==0 && categories.map((category)=>(
              <CategoryCard 
              category={category}
              categoryId={categoryId}
              onClick={() => {
                categoryId===null?setCategoryId(category.id):
                (categoryId===category.id)?setCategoryId(null):
                setCategoryId(category.id)
              }}
            />


            ))
          }
            
          </div>

          <div className='product flex-1 flex-column gap-10 overflow-scroll' style={{padding : '0 10px', height : '40rem'}}>
            <div style={{position: 'sticky', top : '0', backgroundColor : 'white', zIndex : '100'}}>
              All Product
            </div>
            {
              products && products.map((product, index)=>(
                <ContentCard product={product} key={index}/>
              ))
            }
           
          </div>
        </section>

      </div>
    </div>
  )
}

export default AddCategory