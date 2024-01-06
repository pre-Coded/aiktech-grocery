import React, { useEffect, useState } from 'react'
import { FiDelete } from 'react-icons/fi';
import { MdAddCircleOutline } from 'react-icons/md';

import data from '../../../Assets/DummyData.json';
import Loader from '../../../Components/Loader';

const ProductCard = (props) => {
    return (
        <ul
            className='ul-style-none'
            style={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: '4px',
                width: props.width,
                minHeight: '3rem',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 0 1px #111',
                marginBottom: '4px',
                marginRight: props.selectedCard ? '4px' : '0',
                justifyContent: 'space-between'
            }}

            onClick={() => {
                props.onClick(props.data)
            }}
        >
            <li className='flex-column gap-10 justify-center'>
                <span className='text-medium text-bold-md'>
                    {props.data.product_name}
                </span>
                {
                    !props.selectedCard &&
                    <span className='text-small text-bold-sm'>
                        {props.data.description.slice(0, 30)}
                    </span>
                }
            </li>
            <li className='flex-row items-center'>
                {
                    !props.selectedCard ?
                        <MdAddCircleOutline size={'1.2rem'} color={'green'} /> :
                        <FiDelete size={'1.2rem'} color={'red'} />
                }
            </li>
        </ul>
    )
}

const LinkProduct = ({ categoryId, setCategories, setFullCategoryList, fullCategoryList, closeModal }) => {
    const [product, setProducts] = useState([])

    const [loader, setLoder] = useState(true);

    useEffect(() => {
        // make the api call and setProducts here. and setProduct;
        // make the loader false;

    }, [])

    const [selectedCard, toggleSelectedCard] = useState([]);

    const changeCategories = (productIdArray) => {

        const newCategoryList = fullCategoryList.reduct((newCat, cat) => {
            if (cat.id === categoryId) {
                cat.products.concat(productIdArray);
            } else {
                const newSubcategory = cat.sub_categories.reduce((newSub, sub) => {
                    if (sub.id === categoryId) {
                        sub.products.concat(productIdArray);
                    }

                    newSub.push(sub);
                    return newSub;
                }, [])

                cat["sub_categories"] = newSubcategory;
            }

            newCat.push(cat);

            return newCat;
        }, [])

        setCategories(newCategoryList);
        setFullCategoryList(newCategoryList);
    }

    const handleSave = () => {
        // all the ids of the selected product
        const productIdArray = selectedCard.map((item) => item.id);

        // make the api call and if successfull , 
        // call the changecategory function with productIdArray and 
        // make toast success and error and close the modal


    }

    const handleSelect = (data) => {
        toggleSelectedCard(prev => ([...prev, data]));
    }

    const handleDelete = (data) => {
        const filterData = selectedCard.filter(item => item.id !== data.id)

        toggleSelectedCard(filterData);
    }

    return (
        <div className='absolute flex-column' style={{
            width: '20rem',
            minHeight: '30rem',
            maxHeight: '30rem',
            backgroundColor: '#f2f2f2',
            padding: '4px',
            position: 'absolute',
            borderRadius: '8px',
            right: '0',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column',
        }}>
            {
                loader ?
                    <div className='flex-1 flex-row place-item-center'>
                        <Loader />
                    </div>
                    :
                    <>
                        {
                            selectedCard.length > 0 &&
                            <div style={{
                                borderBottom: '1px solid #222',
                                minWidth: '100%',
                                minHeight: '4.5rem',
                                overflowX: 'scroll',
                                overflowY: 'hidden',
                            }}>
                                <div style={{
                                    width: '60rem',
                                    overflowY: 'hidden',
                                    overflowX: 'scroll',
                                    margin: '10px',
                                    padding: '0 2px'
                                }}>
                                    {
                                        selectedCard.map((item) => {
                                            return (
                                                <ProductCard
                                                    key={item.id}
                                                    id={item.id}
                                                    data={item}
                                                    selectedCard={true}
                                                    width={'8rem'}
                                                    onClick={handleDelete}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                        <div
                            style={{
                                overflowY: 'scroll',
                                overflowX: 'hidden',
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
                                            onClick={handleSelect}
                                            selectedCard={false}
                                            width={'100%'}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className='flex-row' style={{ justifyContent: 'flex-end', padding: '1rem 10px' }}>
                            <button className='btn-none btn-primary' onClick={handleSave}>
                                Save
                            </button>
                        </div>


                    </>
            }

        </div>
    )
}

export default LinkProduct