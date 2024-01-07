import React, { useState } from "react";
import {
  addProduct,
  fetchCategories,
  fetchleafcategory,
} from "../../../Api/productAPI";
import '../../AddStock/form.scss'
import { toast } from "react-toastify";
import InputField from "../../../Components/InputField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from '../../../Assets/Images/default-image.png'

import { editCategory } from "../../../Api/dashboardAPI";

import {
  formatOptions,
  errorMsg,
  isNewLine,
  removeNewLine,
} from "../../../Utils/general-utils";

import { addCategory } from "../../../Api/dashboardAPI";
import { actionsCreator } from "../../../Redux/actions/actionsCreator";
import { addSubCategory } from "../../../Api/productAPI";
import axios from "axios";
import { getBaseUrl } from "../../../Lib/NetworkHandler";

const mapStateToProps = ({ stockdropdown, categories = {}, productsearch=[] }) => ({
  stockdropdown,
  categories,
  productsearch
});

function AddCategoryModal({ closeModal, category, handleResponse, category_id, name}) {
  
  const {
    stockdropdown: { list: stockdropdownList },
    categories: { globalCategories: categoryList },
    productsearch: {results: productsearch=[]},
  } = useSelector(mapStateToProps);
  
  const dispatch = useDispatch();
  

  const [item, setItem] = useState({
    category_name: "",
    description: "",
    home_page:false,
    image: null
  });
  const [image, setImage] = useState(null);

  useEffect(()=>{
    if(category){
        setItem({
        id:category.id,
        category_name: category.name,
        description: category.description,
        home_page: category.home_page,
        image: category.image
        }) 
      }

  },[])
  const handleAddItem = (e) =>{
    if(e.target.name === "image"){
     setItem({ ...item, image: e.target.files[0] })
    }
    else if(e.target.name === "home_page"){
      setItem({ ...item, home_page: e.target.checked })

    }
    else{
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  }
    
  const handleSubmit = (e) => {

    e.preventDefault();

    let data = {
      name: item.category_name,
      description: item.description,
      home_page: item.home_page
    };

    if(category){
      data["id"] = item.id
    }
    if(category_id && !category){
      data["category_id"] = category_id
    }
    if(image){
      data["image"]=image
    }


    category ? 
    editCategory(data).then((res)=>{
      if (res.status === 200) {
        toast.success("category updated successfully.");

        handleResponse({
          type : 'category',
          itemId : res.data.id,
          data : res.data
        })

        closeModal();

      } else if (res.status === 400) {
        toast.success("Please fill values correctly.");
      }

    }).catch((err)=>{
      const msg = errorMsg(err);
        toast.error(msg);
    }) 
    : category_id ? addSubCategory(data).then((res)=>{
      if(res.status===201){

        toast.success("added subcategory successfully");

        handleResponse({
          type : 'category',
          itemId : res.data.id,
          data : res.data
        })

        closeModal(false);
      }
    }).catch((err)=>{
      toast.error("error while adding sub category");
    }) 
    : addCategory(data)
      .then((res) => {
        
        if (res.status === 201) {
          toast.success("category added successfully.");

          handleResponse({
            type : 'category',
            itemId : res.data.id,
            data : res.data
          })

          closeModal(false);
        } else if (res.status === 400) {
          toast.success("Please fill values correctly.");
        }
    
        
      })
      .catch((error) => {
        const msg = errorMsg(error);
        toast.error(msg);
      });
    };



  const fetchCategories = async () => {
    dispatch(actionsCreator.FETCH_CATEGORIES_GLOBAL());
  };


  return (
    <form className="add-product-wrapper flex-column gap-10" encType="multipart/form-data">
      <div className="text-large text-bold-md" style={{textAlign : 'center'}}>Add { !name ? "Category" : "SubCategory" }</div>
      <input 
        className="input-border"
        type={"text"}

        name="category_name"
        id="category_name"
        placeholder={`${!name ? "Category " : "SubCategory "}Name`}
        value={item.category_name}
        onChange={handleAddItem}
        required
      />

      <textarea
        style={{
          minHeight : '10rem', 
          resize : 'none',
          backgroundColor : 'transparent'
        }}

        className="input-border"
        type={"text"}

        name="description"
        id="description"
        placeholder="Description"
        value={item.description}
        onChange={handleAddItem}
        required
      />

      <div className="flex-row justify-between items-center nowrap input-border" style={{width : '100%'}}>
        <label htmlFor="home_page">Display on homepage</label>
        <input
          type="checkbox"
          name="home_page"
          id="honme_page"
          placeholder="Show this on homepage"
          value={item.home_page}
          onChange={handleAddItem}
          checked={item.home_page}
          style={{
            width : '1rem',
          }}
        />
      </div>

      <div className={'input-border flex-row items-center gap-10'}>

        <div className={'overflow-hidden'} style={{
          height: '4rem',
          aspectRatio: '1',
        }}>
          <img
            src={image ? URL.createObjectURL(image) : defaultImg} 
            alt="Selected"
            style={{
              height: '100%',
              aspectRatio: '1',
              objectFit: 'contain',
            }}
          />
        </div>

        <input
          type={'file'}
          onChange={(event) => {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
          }}
          required
        />
        
      </div>

      <div className="option-buttons save-changes-buttons">
        <button className="btn-none btn-outline" onClick={() => closeModal(false)}>
          Discard
        </button>
        <button className="btn-none btn-primary" onClick={handleSubmit} type={'submit'}>Save</button>
      </div>
    </form>
  );
}

export default AddCategoryModal;
