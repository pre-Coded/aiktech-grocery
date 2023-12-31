import React, { useEffect, useRef, useState } from 'react'
import './AddProduct.scss'

import { BsThreeDotsVertical } from "react-icons/bs";

import { BiSolidCheckboxChecked } from "react-icons/bi";
import { ImCheckboxUnchecked } from "react-icons/im";
import HoverComponent from '../../../Components/HoverComponent/HoverComponent';
import { debounce } from "../../../Utils";
import { dashboardAPI } from '../../../Api';

const DropDownModel = () => {
    return (
        <div className=''>

        </div>
    )
}

const ContentCard = (props) => {
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
                                    {props.product && props.product.product_name}
                                </span>
                                <span className='product-description text-bold-sm text-small'>
                                    {props.product && props.product.description}
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
                props.cardId !== null && props.categoryId !== null  &&  (props.cardId === props.categoryId) ? 
                    <div className='subcategory-container border' >
                        
                    </div>
                : 

                <div>
                </div>
            }
        </div>
    )
}


const AddProduct = ({products}) => {
    
    const handleSearch = () => {
        // debounce((event) => {
        //     props.search(event.target.value);
        //   }, 400)
    }

    return (
        <div className='add-content-container'>
            <div className='add-content-wrapper flex-column'>

                <section className='flex-row gap-10 flex-1'>

                    <div className='search-tab input-border smaller-input-padding flex-1'>
                        <input
                            type={'search'}
                            placeholder="Search Your Product..."
                            onChange={handleSearch}
                        />
                    </div>


                    <button className='add-btn btn-none btn'>
                        {`Add Product`}
                    </button>

                </section>

                <section className='all-products-list-wrapper flex-1'>
                    <div className='all-products-list overflow-scroll' style={{height : '40rem', paddingBottom : '5rem'}}>
                        {
                            products.length!==0 && products.map((product, index)=>(
                                <ContentCard cardId="1" product={product} key={index}/>

                            ))
                        }
                             
                    </div>
                </section>
            </div>
        </div>
    )
}

export {ContentCard}

export default AddProduct;