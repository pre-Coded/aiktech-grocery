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
import { productList } from '../../../../api/request.api';


const AddProduct = () => {
    const [products, setProducts] = useState([])
    const [fullProductList, setFullProductList] = useState([]);

    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);

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
        id: null, 
    })  

    // Modal View and toggleEdit Button
    const handleToggleModal = () => {
        toggleAddOrEditModal(prev => !prev);
    }

    const handleEditButton = (data) => {

        setProductForm({
            id: data.id,
            product_name : data.product_name,
            packaging_price: data.packaging_price,
            description: data.description,
            category: data.category,
            barcode: data.barcode
        })

        handleToggleModal()
    }

    const handleDelete = (data) => {

        if(data.type === "product"){
            const newProductList = fullProductList.filter((item) => item.id !== data.cardId)

            setFullProductList(newProductList);

            // if user deletes while searching
            const searchText = searchRef.current.value;

            if (searchText === null || searchText.length === 0 || searchText === "") {
                setProducts(newProductList);
            }

            const filterItem = newProductList.filter((item) => {
                return item?.product_name.toLowerCase().includes(searchText.toLowerCase())
            })

            setProducts(filterItem);
        }
    }

    const handleEditSuccess = (data) =>{

        if(data.type === "product"){

            // if it didn't match even once, then it's a new Product added.
            let newProductAdded = true;

            const newProductList = fullProductList.reduce(( product, productItem ) => {

                // if it didn't match even once, then it's a new Product added.

                if(productItem.id === data.itemId){
                    productItem = data.data;

                    if(newProductAdded) newProductAdded = false;
                }

                product.push(productItem);

                return product;
            }, [])


            if(newProductAdded) newProductList.push(data.data);

            setFullProductList(newProductList)

            // if user is adding while searching;
            const searchText = searchRef.current.value;

            if (searchText === null || searchText.length === 0 || searchText === "") {
                setProducts(newProductList);
            }

            const filterItem = newProductList.filter((item) => {
                return item?.product_name.toLowerCase().includes(searchText.toLowerCase())
            })

            setProducts(filterItem);
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
                    <AddProductModal 
                        closeModal={toggleAddOrEditModal} 
                        product={productForm} 
                        handleResponse={ handleEditSuccess }
                        addProductToCat={false}
                    />
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
                                ref={searchRef}
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
                                        productCard
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