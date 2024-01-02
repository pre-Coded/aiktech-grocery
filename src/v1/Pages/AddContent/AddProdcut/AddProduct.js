import React, { useEffect, useMemo, useRef, useState } from 'react'
import './AddProduct.scss'

import { Modal } from '../../../Components';
import ContentCard from '../ContentCards';


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
        product_name : "",
        packaging_price: "",
        description: "",
        sku: "",
        category: null,
        id:null
    })

    // Modal View and toggleEdit Button
    const handleToggleModal = () => {
        toggleAddOrEditModal(prev => !prev);
    }

    const handleEditButton = (data) => {
        console.log("clicked edit", data)

        setProductForm({
            id: data.id,
            product_name : data.product_name,
            packaging_price: data.packaging_price,
            description: data.description,
            category: data.category,
            barcode: data.barcode
        })

        handleToggleModal();
    }

    const handleFormInput = (e) => {
        setProductForm( prev => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    const handleDelete = (data) => {
        console.log(data);
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
                    
                    <AddProductModal closeModal={toggleAddOrEditModal} product={productForm}/>
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

                    <button onClick={()=>{
                        handleToggleModal();
                        setProductForm(null)
                    }} className='add-btn btn-none btn'>
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

                                    deleteCard={{
                                        itemName : 'product',
                                        response : handleDelete,
                                    }}

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


export default AddProduct;