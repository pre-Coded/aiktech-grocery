import React, {useRef, useState} from "react";
import { toast } from "react-toastify";

import { deleteProduct, deleteCategory, deleteProductFromCategory, deleteSubCategoryFromCategory } from '../../Api/dashboardAPI';
import HoverComponent from '../../Components/HoverComponent/HoverComponent';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartCheck, BsThreeDotsVertical } from "react-icons/bs";

const ContentCard = (props) => {

    const editRef = useRef(null);
    const [showEditBtn, toggleEditBtn] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();

        if(props.deleteCard?.itemName === "product"){
            try{
                const response = await deleteProduct({id : props.cardId})

                response && props.deleteCard?.response({
                    id : props.deleteCard?.itemName, 
                    data : response.data
                });

            }catch(e){
                toast.error("Error in deleting product.")
            }
        }

        if(props.deleteCard?.itemName === "productFromCat"){
            try{
                const response = await deleteProductFromCategory({ category_id : props.categoryId, id : props.cardId})

                response && props.deleteCard?.response({
                    id : props.deleteCard?.itemName, 
                    data : response.data
                });

            }catch(e){
                toast.error("Error in deleting product.")
            }
        }

        if(props.deleteCard?.itemName === "productFromSubCat"){
            try{
                const response = await deleteProduct({ category_id : props.subCategoryId , id : props.cardId})

                response && props.deleteCard?.response({
                    id : props.deleteCard?.itemName, 
                    data : response.data
                });

            }catch(e){
                toast.error("Error in deleting product.")
            }
        }


        if(props.deleteCard?.itemName === "category"){
            try{
                const response = await deleteCategory({id : props.cardId})

                response && props.deleteCard?.response({
                    id : props.deleteCard?.itemName, 
                    data : response.data
                });
            }catch(e){
                toast.error("Error in deleting category.")
            }
        }

        if(props.deleteCard?.itemName === "subcateogory"){
            try{
                const response = await deleteSubCategoryFromCategory({ category_id : props.categoryId, id : props.cardId})

                response && props.deleteCard?.reponse({
                    id : props.deleteCard?.itemName, 
                    data : response.data
                });
            }catch(e){
                toast.error("Error in deleting subcategory.")
            }   
        }



    }

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
                    id : props.data?.id,
                    name : props.data?.name, 
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

                                    onClick={ handleDelete }
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

                                        categoryId = {props.cardId}
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
            
            categoryId={props.categoryId}
            selectSubCategory={props.selectSubCategory}

            categoryCard
        />
    )
}

export default ContentCard;