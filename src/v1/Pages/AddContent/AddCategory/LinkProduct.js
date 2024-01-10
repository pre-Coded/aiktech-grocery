import React, { useEffect, useRef, useState } from 'react'
import AddCategory from './AddCategory.scss';
import { FiDelete } from 'react-icons/fi';
import { MdAddCircleOutline, MdDelete, MdGroupAdd } from 'react-icons/md';
import { fetchAllTenantProducts, linkProductToCategory } from '../../../Api/dashboardAPI';
import data from '../../../Assets/DummyData.json';
import Loader from '../../../Components/Loader';
import { toast } from 'react-toastify';
import defaultImg from '../../../Assets/Images/default-image.png'
import { IoAddCircleOutline } from "react-icons/io5";
import InfiniteScroller from '../../../Components/InfiniteScrollContainer/InfiniteScrollerContainer';
import { dashboardAPI } from '../../../Api';


const TreeView = ({ treeView }) => {
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);

    return (
        <ul className='ul-style-none'>
            <li onClick={(e) => {
                e.stopPropagation();
                setActive(prev => !prev);
            }} className={active ? 'caret caret-down' : 'caret'}>
                {treeView.categoryName}
                <ul className={`${active ? "active" : 'nested'}`}>
                    {treeView.subCategoryName !== '' &&
                        <li onClick={(e) => {
                            e.stopPropagation();
                            setActive2(prev => !prev)
                        }} className={active2 ? 'caret caret-down' : 'caret'}>
                            {treeView.subCategoryName}
                        </li>
                    }
                    <ul className={`${active2 ? "active" : 'nested'}`}>
                        {treeView.products?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </ul>
            </li>
        </ul>
    );
}


const ProductCard = (props) => {
    return (
        <ul
            className='ul-style-none'
            style={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: props.width,
                // maxHeight: '4rem',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                border : '1px solid #f2f2f2',
                boxShadow : '0 0 2px #f2f2f2',
                marginBottom: '4px',
                gap : '10px',
            }}

            onClick={() => {
                props.onClick(props.data)
            }}
        >
            <li
                className='content-card-img overflow-hidden'
                style={{
                    height: '3.8rem',
                    aspectRatio: '1',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={props.data?.photo || props.data?.image || defaultImg}
                    alt={"Not Found"}
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        fontSize: '10px',
                        justifyContent: 'flex-start',
                        display: 'inline-block'
                    }}
                />
            </li>
            <li className='flex-column justify-center flex-1'>
                <span className='text-medium text-bold-md text-uppercase'>
                    {props.data.product_name?.substring(0, 20)}...
                </span>

                <span className='text-small text-bold-sm'>
                    {props.data.description?.slice(0, 30)}
                </span>
            </li>
            <li className='flex-row items-center'>
                {
                    !props.selectedCard ?
                        <IoAddCircleOutline size={'1.5rem'} color={'#00FF00'} /> :
                        <MdDelete size={'1.4rem'} color={'red'} />
                }
            </li>
        </ul>
    )
}

const LinkProduct = ({ 
        categoryId, 
        page,
        setPage,
        fullCategoryList,
        setCategories, 
        setFullCategoryList, 
        fullProductList,
        setFullProductList
    }) => {

    const [product, setProducts] = useState([])
    // const [fullProductList, setFullProductList] = useState([]);
    useEffect(async ()=>{
        const response = await fetchAllTenantProducts();
        setProducts(response.data)
    },[])

    useEffect(() => {
        setProducts(fullProductList)
    }, [fullProductList])

    const [loader, setLoader] = useState(false);

    const [treeView, setTreeView] = useState(null);


    const [selectedCard, toggleSelectedCard] = useState([]);

    const filterProductName = (selectedProducts = []) => {
        const selectedProductNames = product
            .filter(p => selectedProducts.some(item => item === p.id))
            .map(p => p.product_name);

        return selectedProductNames;
    }

    const changeCategories = (productIdArray) => {

        const newCategoryList = fullCategoryList.reduce((newCat, cat) => {
            if (cat.id === categoryId) {
                cat.products.concat(productIdArray);

                setTreeView({
                    categoryName: cat.name,
                    subCategoryName: '',
                    products: filterProductName(cat.products)
                })

            } else {

                const newSubcategory = cat.sub_categories.reduce((newSub, sub) => {
                    if (sub.id === categoryId) {
                        sub.products.concat(productIdArray);

                        setTreeView({
                            categoryName: cat.name,
                            subCategoryName: sub.name,
                            products: filterProductName(sub.products)
                        })
                    }

                    newSub.push(sub);
                    return newSub;
                }, [])

                cat["sub_categories"] = newSubcategory;
            }

            newCat.push(cat);

            return newCat;
        }, [])

        // setCategories(newCategoryList);
        setFullCategoryList(newCategoryList);
    }

    const handleSave = async () => {
        // all the ids of the selected product
        const productIdArray = selectedCard.map((item) => item.id);

        // make the api call and if successfull , 
        const data = {
            "category_id": categoryId,
            "product_id": productIdArray
        }
        const response = await linkProductToCategory(data)
        if (response.status === 200) {
            toast.success("linked successfully");
            changeCategories(productIdArray)

        }
        else {
            toast.error("Error while linking product");
        }

    }

    const toggleSelect = (data) => {
        if (selectedCard.some((item) => item.id === data.id)) {
            const filterCard = selectedCard.filter((item) => item.id !== data.id);
            toggleSelectedCard(filterCard);
            return;
        }

        toggleSelectedCard(prev => ([...prev, data]));
    }


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
    
    return (
        <div className='absolute flex-column' style={{
            width: '100%',
            height: '30rem',
            backgroundColor: 'white',
            borderLeft: '1px solid #5c77ff',
            borderRight: '1px solid #5c77ff',
            borderBottom: '1px solid #5c77ff',
            padding: '4px',
            position: 'absolute',
            borderRadius: '8px',
            right: '0',
            overflow : 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {
                loader ?
                    <div className='flex-1 flex-row place-item-center'>
                        <Loader />
                    </div>
                    :
                    (
                        treeView !== null ?
                            <div className='flex-1 flex-row place-item-center' style={{ paddingTop: '10px' }}>
                                <TreeView treeView={treeView} />
                            </div>
                            :
                            <>

                                <div
                                    className='flex-1 input-border'
                                    style={{ 
                                        maxHeight: '2.5rem'
                                    }}
                                >
                                    <input
                                        placeholder='Search Product'
                                        type={'search'}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </div>

                                <div
                                    className='overflowY-scroll'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px 4px',
                                        flex: '1',
                                    }}
                                >
                                
                                     
                                        {
                                            product.map((item) => {
                                                return (
                                                    <ProductCard
                                                    key={item.id}
                                                    id={item.id}
                                                    data={item}
                                                    onClick={toggleSelect}
                                                    selectedCard={selectedCard.some(card => card.id === item.id)}
                                                    width={'100%'}
                                                    />
                                                    )
                                                })
                                            }
                                    
                                </div>

                                <div 
                                    className='gap-10 flex-column' 
                                    style={{ 
                                        padding: '1rem 10px', 
                                        maxHeight: '10rem',
                                        width : '100%', 
                                        overflowX : "hidden",
                                    }}
                                >
                                    {
                                        selectedCard.length > 0 && 
                                        <div 
                                            className='' 
                                            style={{ 
                                                overflowX: 'scroll', 
                                                whiteSpace : 'nowrap',
                                                minWidth : '300px',
                                                paddingRight : '20px'
                                            }}
                                        >
                                        {
                                            selectedCard.map((item) => {
                                                return (
                                                    <button
                                                        style={{
                                                            display: 'inline-flex',
                                                            padding: '4px',
                                                            marginRight : '10px',
                                                            marginBottom : '5px',
                                                            alignItems : 'center'
                                                        }}

                                                        onClick={() => {
                                                            toggleSelect(item)
                                                        }}

                                                        className="btn-none gap-10 input-border"
                                                    >
                                                        <span>{item.product_name}</span>
                                                        <MdDelete size={'1.2rem'} color={'red'} />
                                                    </button>
                                                )
                                            })
                                        }
                                        </div>
                                    }

                                    <div className='flex-row' style={{ justifyContent: 'flex-end', maxHeight : '2.2rem', justifySelf : 'flex-end' }}>
                                        <button className='btn-none btn-primary' onClick={handleSave}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </>
                    )
            }

        </div>
    )
}

export default LinkProduct