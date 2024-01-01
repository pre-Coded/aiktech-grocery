import React, { useEffect, useMemo, useRef, useState } from 'react'
import './AddProduct.scss'
import { BsThreeDotsVertical } from "react-icons/bs";

import HoverComponent from '../../../Components/HoverComponent/HoverComponent';

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { InputField, Modal } from '../../../Components';
import AddProductForm from '../../AddStock/AddProduct';

const ContentCard = (props) => {

    const editRef = useRef(null);
    const [showEditBtn, toggleEditBtn] = useState(false);

    return (
        <div
            className='content-card-container border'

            style={{
                maxHeight: (props.productCard && "10rem") || (props.categoryCard && "30rem"),
                width: (props.productCard && "32%") || (props.categoryCard && "100%"),
                padding: "5px"
            }}


            onClick={ (e) => {
                e.stopPropagation();

                props.selectSubCategory &&  props.selectSubCategory(e, {
                    name : props.data.name, 
                    data : props.data?.products
                });

                props.onClick && props.onClick(e);
            }}

        >
            <div className='content-card-wrapper flex-column'>

                <div
                    className='content-card-edit btn-none'
                    onMouseEnter={() => toggleEditBtn(true)}
                    onMouseLeave={() => toggleEditBtn(false)}
                    ref={editRef}
                >
                    <BsThreeDotsVertical fontSize={'1rem'} color={"black"} />
                    {
                        showEditBtn &&
                        <HoverComponent
                            hoverRef={editRef}
                        >
                            <div className='flex-column gap-10'>
                                <button
                                    onClick={ (e) => {
                                        e.stopPropagation();

                                        console.log("Clicked Edit");

                                        props.editFunction && props.editFunction(props.data)
                                    }}
                                    className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'
                                >
                                    <CiEdit fontSize={'1.2rem'} style={{maxWidth : '2rem'}}/> Edit
                                </button>
                                <button
                                    className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'
                                >
                                    <MdDeleteOutline fontSize={'1.2rem'} style={{maxWidth : '2rem'}}/> Delete
                                </button>
                            </div>
                        </HoverComponent>
                    }
                </div>

                <div className='content-card-details'>

                    <ul className='content-card-ul ul-style-none flex-row gap-10'>

                        <li className='content-card-img overflow-hidden' style={{ maxHeight : '3.8rem', aspectRatio : '1'}}>
                            <img
                                src={props.data?.image || props.data?.photo} alt={"ImageError"}

                                style={{
                                    objectFit: 'contain',
                                    height : '100%',
                                    aspectRatio: '1',
                                }}
                            />
                        </li>

                        <li className='flex-column gap-10 text-bold-md text-medium flex-1'>

                            <div className='flex-column'>
                                <span
                                    className='product-title text-bold-md text-medium'
                                    style={{
                                        maxHeight: '2rem',
                                    }}
                                >
                                    {props.data?.product_name || props.data?.name || "Title"}
                                </span>
                                <span className='product-description text-bold-sm text-small'>
                                    {props.data?.description.substring(0, 43) || ""}
                                </span>

                            </div>
                        </li>

                    </ul>

                </div>
            </div>

            {
                props.cardId !== null && 
                props.selectedCardId !== null &&
                (props.cardId === props.selectedCardId) &&
                    <div className='subcategory-container flex-column' >
                        {
                            props.data?.sub_categories.length > 0 ?
                            props.data?.sub_categories?.map((item, index) => {
                                return (
                                    <SubContentCard
                                        key={item.id}
                                        cardId={item.id}
                                        data={item}

                                        selectSubCategory={props.selectSubCategory}

                                    />
                                )
                            }) :

                            <span className='text-small text-bold-sm'>
                                No SubCategory to show.
                            </span>
                        }
                    </div>
            }
        </div>
    )
}


const SubContentCard = (props) => {
    return (
        <ContentCard 
            key={props.cardId}
            cardId={props.cardId}
            data={props.data}
            
            selectSubCategory={props.selectSubCategory}

            categoryCard
        />
    )
}



const AddProduct = ({ products }) => {

    const [searchText, setSearchText] = useState("")

    const originalProduct = products;

    // handling searchPart
    products = useMemo(() => {
        if (searchText === null || searchText.length === 0 || searchText === "") {
            return originalProduct;
        }

        return originalProduct.filter((item) => {
            return item?.product_name.toLowerCase().includes(searchText.toLowerCase());
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
            product_name : data.product_name,
            packaging_price: data.packaging_price,
            description: data.description
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
        <div className='add-content-container flex-column flex-1'>
            {
                addOrEditModal && 
                <Modal 
                    show={addOrEditModal}
                    onClick={handleToggleModal}
                >
                    {/* <input placeholder='Enter id' name="id" value={productForm.id} onChange={handleFormInput}/>
                    <input placeholder='Enter password' name="password" value={productForm.password} onChange={handleFormInput}/>
                    <input type={'button'} value="Submit"/> */}
                    
                    <AddProductForm closeModal={handleToggleModal}/>
                    <button className='btn-none' onClick={handleToggleModal}>Discard</button>
                </Modal>
            }


            <div className='add-content-wrapper flex-column'>

                <section className='flex-row gap-10 flex-1'>

                    <div className='search-tab input-border smaller-input-padding flex-1'>
                        <input
                            type={'search'}
                            placeholder="Search Your Product..."
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                        />
                    </div>

                    <button onClick={handleToggleModal} className='add-btn btn-none btn'>
                        {`Add Product`}
                    </button>

                </section>

                <section className='all-products-list-wrapper flex-row flex-1'>
                    <div className='all-products-list overflow-scroll flex-1'>
                        {
                            products.length !== 0 && products.map((product, index) =>
                            (
                                <ContentCard
                                    key={product.id}
                                    cardId={product.id}
                                    data={product}
                                    
                                    editFunction={handleEditButton}
                                    productCard
                                />
                            )
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export { ContentCard }

export default AddProduct;