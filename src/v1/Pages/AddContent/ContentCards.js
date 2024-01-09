import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import './ContentCard.scss'

import { deleteProduct, deleteCategory, deleteProductFromCategory, deleteSubCategoryFromCategory } from '../../Api/dashboardAPI';
import HoverComponent from '../../Components/HoverComponent/HoverComponent';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartCheck, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import defaultImg from '../../Assets/Images/default-image.png'

const ContentCard = (props) => {

    const editRef = useRef(null);
    const [showEditBtn, toggleEditBtn] = useState(false);

    const [deleteLoader, setDeleteLoader] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();

        setDeleteLoader(true);

        if (props.deleteCard?.itemName === "product") {
            try {

                const response = await deleteProduct({ id: props.cardId })
                response.status === 202 && props.deleteCard?.response({
                    type: props.deleteCard?.itemName,
                    cardId: props.cardId
                });

            } catch (e) {
                toast.error("Error in deleting product.", { autoClose: 1000 })
            }
        }

        if (props.deleteCard?.itemName === "productFromCat") {
            try {
                const response = await deleteProductFromCategory({ category_id: props.categoryId, id: props.cardId })

                response.status === 202 && props.deleteCard?.response({
                    type: props.deleteCard?.itemName,
                    cardId: props.cardId,
                    catOrSubCatId: props.categoryId,
                });

            } catch (e) {
                toast.error("Error in deleting product.", { autoClose: 1000 })
            }
        }

        if (props.deleteCard?.itemName === "productFromSubCat") {
            try {
                const response = await deleteProductFromCategory({ category_id: props.subCategoryId, id: props.cardId })

                response.status === 202 && props.deleteCard?.response({
                    type: props.deleteCard?.itemName,
                    cardId: props.cardId,
                    catOrSubCatId: props.subCategoryId,
                });

            } catch (e) {
                toast.error("Error in deleting product.", { autoClose: 1000 })
            }
        }


        if (props.deleteCard?.itemName === "category") {
            try {
                const response = await deleteCategory({ id: props.cardId })

                response.status === 202 && props.deleteCard?.response({
                    type: props.deleteCard?.itemName,
                    cardId: props.cardId
                });
            } catch (e) {
                toast.error("Error in deleting category.", { autoClose: 1000 })
            }
        }

        if (props.deleteCard?.itemName === "subcategory") {
            try {
                const response = await deleteSubCategoryFromCategory({ category_id: props.categoryId, id: props.cardId })

                response.status === 202 && props.deleteCard?.response({
                    type: props.deleteCard.itemName,
                    cardId: props.cardId
                });

            } catch (e) {
                toast.error("Error in deleting subcategory.", { autoClose: 1000 })
            }
        }

        setDeleteLoader(false);
    }

    return (
        <div
            className='content-card-container border'
            style={{
                width: '100%',
                padding: "5px",
            }}

            onClick={(e) => {
                e.stopPropagation();

                props.selectSubCategory && props.selectSubCategory(e, {
                    id: props.data?.id,
                    name: props.data?.name,
                    data: props.data?.products
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
                    <BsThreeDotsVertical style={{ cursor: 'pointer' }} fontSize={'1rem'} color={"black"} />
                    {
                        showEditBtn &&
                        <HoverComponent
                            hoverRef={editRef}
                            style={{
                                backgroundColor: '#f2f2f2',
                                padding: '4px 0',
                                width: '10rem',
                                borderRadius: '8px'
                            }}
                        >
                            <div className='flex-column gap-10'>
                                {
                                    props.editFunction &&
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            props.editFunction && props.editFunction(props.data)
                                        }}
                                        className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'
                                    >
                                        <CiEdit fontSize={'1.2rem'} style={{ maxWidth: '2rem' }} /> Edit
                                    </button>
                                }
                                <button
                                    className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'

                                    onClick={handleDelete}
                                >
                                    <MdDeleteOutline fontSize={'1.2rem'} style={{ maxWidth: '2rem' }} />
                                    {
                                        deleteLoader ?
                                            <span>Unlinking...</span>
                                            :
                                            <span>Unlink</span>
                                    }
                                </button>

                                {
                                    props.addSubcategory &&
                                    <button
                                        className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'

                                        onClick={(e) => {
                                            e.stopPropagation();
                                            props.addSubcategory(props.cardId)
                                        }}

                                    >

                                        <IoMdAdd fontSize={'1.2rem'} style={{ maxWidth: '2rem' }} />
                                        {
                                            'Add Subcategory'
                                        }
                                    </button>
                                }

                            </div>
                        </HoverComponent>
                    }
                </div>

                <div className='content-card-details'>

                    <ul className='content-card-ul ul-style-none flex-row gap-10'>

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
                                loading={'lazy'}
                            />
                        </li>

                        <li className='flex-column justify-center text-bold-md text-medium flex-1' style={{paddingRight : '10px'}}>

                            <div className='flex-column justify-center text-uppercase'>

                                <span
                                    className='product-title text-bold-md text-medium'
                                    style={{
                                    }}
                                >
                                    {
                                        props.data?.product_name?.toUpperCase() ||
                                        props.data?.name?.toUpperCase() ||
                                        "Title"
                                    }
                                </span>
                                <span className='product-description text-bold-sm text-small'>
                                    {
                                        (props.data?.description && props.data?.description?.substring(0, 35) + "...") ||
                                        "Description"
                                    }
                                </span>

                                <span className='product-description text-bold-sm text-small flex-row gap-10 items-center'>
                                    {props.data?.market_price && `Market Price : ${props.data?.market_price}`}
                                    {props.data?.price && `Our Price : ${props.data?.price}`}
                                </span>

                            </div>

                        </li>

                    </ul>

                </div>
            </div>


            {
                props.cardId !== null &&
                props.selectedCardId !== null &&
                !props.productCard &&
                (props.cardId === props.selectedCardId) &&
                <div className='subcategory-container overflow-scroll' >
                    {
                        props.data?.sub_categories?.length > 0 ?
                            <>
                                <span className="text-small text-bold-md" style={{ marginBottom: '5px' }}>Sub-Categories</span>
                                {
                                    props.data?.sub_categories?.map((item, index) => {
                                        return (
                                            <div style={{
                                                width: '100%',
                                                marginBottom: '1%'
                                            }}>
                                                <SubContentCard
                                                    key={item.id}
                                                    cardId={item.id}
                                                    data={item}

                                                    categoryId={props.cardId}
                                                    selectSubCategory={props.selectSubCategory}

                                                    deleteCard={props.deleteSubCategory}

                                                    productCard
                                                    width={"100%"}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </>
                            :
                            (
                                <span className='text-small text-bold-sm'>
                                    No SubCategory to show.
                                </span>
                            )
                    }
                </div>
            }
        </div>
    )
}


const SubContentCard = (props) => {
    return (
        <ContentCard
            {...props}
        />
    )
}

export const LoadingCard = ({ num }) => {
    return (
        Array.from({ length: num }, () => 0).map((data, ind) => {
            const even = ind % 2 === 0
            return (
                <div style={{
                    width: '100%',
                    marginBottom: '1%',
                }}>
                    <div
                        className={`content-card-container border ${even ? 'card-loading1' : 'card-loading2'}`}
                        style={{
                            width: '100%',
                            padding: "5px",
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '4px',
                        }}
                    >
                        <div
                            style={{
                                height: '3.8rem',
                                aspectRatio: '1',
                                borderRadius: '8px',
                                backgroundColor: '#666'
                            }}
                        />
                        <div
                            className={`${even ? 'card-loading2' : 'card-loading1'} flex-1`}
                            style={{
                                backgroundColor: '#666',
                                borderRadius: '8px',
                            }}
                        />
                    </div>
                </div>
            )
        })
    )
}

export default ContentCard;