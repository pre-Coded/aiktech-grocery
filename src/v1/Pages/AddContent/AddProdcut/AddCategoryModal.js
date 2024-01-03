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

import { editCategory } from "../../../Api/dashboardAPI";

import {
  formatOptions,
  errorMsg,
  isNewLine,
  removeNewLine,
} from "../../../Utils/general-utils";
import { addCategory } from "../../../Api/dashboardAPI";
import { actionsCreator } from "../../../Redux/actions/actionsCreator";

const mapStateToProps = ({ stockdropdown, categories = {}, productsearch=[] }) => ({
  stockdropdown,
  categories,
  productsearch
});

////
function AddCategoryModal({ closeModal, setBarcode, category, handleResponse}) {
  const {
    stockdropdown: { list: stockdropdownList },
    categories: { globalCategories: categoryList },
    productsearch: {results: productsearch=[]},
  } = useSelector(mapStateToProps);
  
  const dispatch = useDispatch();
  

  const [item, setItem] = useState({
    category_name: "",
    description: "",
    home_page:false
  });
  console.log(item,"item");
  useEffect(()=>{
    if(category){
      console.log(category,"catgor in  props");
        setItem({
        id:category.id,
        category_name: category.name,
        description: category.description,
        home_page: category.home_page,
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
    

  //////
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {

      name: item.category_name,
      description: item.description,
      image: item.image,
      home_page: item.home_page

    };

    console.log(data)
    if(category){
      data["id"] = item.id

    }

    category ? editCategory(data).then((res)=>{
      if (res.status === 200) {
        toast.success("category updated successfully.");

        handleResponse({data : res.data, id : "product"})

        closeModal();
        
        
      } else if (res.status === 400) {
        toast.success("Please fill values correctly.");
      }

    }).catch((err)=>{
      const msg = errorMsg(err);
        toast.error(msg);

    }) : addCategory(data)
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          toast.success("category added successfully.");

          handleResponse({data : res.data, id : "category"})

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
    <form className="add-product-wrapper flex-column gap-10">
      <div className="text-large text-bold-md" style={{textAlign : 'center'}}>Add Category</div>

      <input 
        className="input-border"
        type={"text"}

        name="category_name"
        id="category_name"
        placeholder="category name"
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
          placeholder="show this on home page"
          value={item.home_page}
          onChange={handleAddItem}
          checked={item.home_page}
          style={{
            width : '1rem',
          }}
        />
      </div>

      <div className="option-buttons save-changes-buttons">
        <button className="btn-none btn-outline" onClick={() => closeModal(false)}>
          Discard
        </button>
        <button className="btn-none btn-primary" onClick={handleSubmit}>Save</button>
      </div>
    </form>
  );
}

export default AddCategoryModal;
