import React, { useEffect, useMemo, useRef, useState } from 'react'
import './AddProduct.scss'

import { Modal } from '../../../Components';
import ContentCard from '../ContentCards';

import AddProductModal from './AddProductModal';
import { useAsyncError } from 'react-router';

import { dashboardAPI } from "../../../Api/index.js";

import data from '../../../Assets/DummyData.json'

import Loader from '../../../Components/Loader';
import { toast } from 'react-toastify';


const AddProduct = () => {
    const [products, setProducts] = useState([])
    const [fullProductList, setFullProductList] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchItem = async () => {
        try{
            const response = await dashboardAPI.fetchTenantProducts();
            setProducts(response.data);
            setFullProductList(response.data)
        }catch(e){
            toast.error("Failed in fetching product.", 1000)
        }

        setLoading(false);
    }

    useEffect(async ()=>{
        fetchItem();
    },[])


    // handling searchPart
    const handleChange = (e) => {
        const searchText = e.target.value;

        if (searchText === null || searchText.length === 0 || searchText === "") {
            setProducts(fullProductList);
            return;
        }

        const filterItem = fullProductList.filter((item) => {
            return item?.product_name.toLowerCase().includes(searchText.toLowerCase())
        })

        setProducts(filterItem);
    }

    const [addOrEditModal, toggleAddOrEditModal] = useState(false);

    const [productForm, setProductForm] = useState({
        product_name : "",
        packaging_price: "",
        description: "",
        sku: "",
        category: null,
        id: null
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

    const handleDelete = (data) => {
        if(data.id === "product"){
            setProducts(data?.data);
            setFullProductList(data?.data);
        }
    }

    const handleEditSuccess = (data) =>{
        if(data.id === "product"){
            setProducts(data.data);
            setFullProductList(data.data)
        }
    }

    return (
        <div className='add-content-container flex-column flex-1'>
            {
                addOrEditModal && 
                <Modal 
                    show={addOrEditModal}
                    onClick={handleToggleModal}
                >
                    <AddProductModal closeModal={toggleAddOrEditModal} product={productForm} handleResponse={ handleEditSuccess }/>
                </Modal>
            }

            {
                loading ? 

                <div className="flex-1 flex-row place-item-center">
                    <Loader />
                </div> : 

                <div className='add-content-wrapper flex-column'>

                    <section className='flex-row items-center gap-10 flex-1'>

                        <div className='search-tab input-border flex-1'>
                            <input
                                type={'search'}
                                placeholder="Search Your Product..."
                                onChange={handleChange}
                            />
                        </div>

                        <button onClick={()=>{
                            handleToggleModal();
                            setProductForm(null)
                        }} className='add-btn btn-none btn-outline'>
                            {`Add Product`}
                        </button>

                    </section>

                    <section className='all-products-list-wrapper flex-row flex-1'>
                        <div className='all-products-list overflow-scroll flex-1'>
                            {
                                products.length !== 0 ? 
                                products.map((product, index) =>
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

                                        width ={"32%"}
                                    />
                                )
                                ) 
                                :
                                <div className='text-medium text-bold-sm flex-1 flex-row place-item-center'>
                                    No Product to show
                                </div>
                            }
                        </div>
                    </section>
                </div>
            }


        </div>
    )
}


export default AddProduct;