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

const mapStateToProps = ({ stockdropdown, categories = {}, productsearch=[] }) => ({
  stockdropdown,
  categories,
  productsearch
});

////
function AddCategoryModal({ closeModal, setBarcode, category}) {
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
        if (res.data.status === 201) {
          toast.success("category added successfully.");
          closeModal();
          
        
        } else if (res.data.status === 400) {
          toast.success("Please fill values correctly.");
        }
        const code = data["barcode"] + "\n";
        setBarcode(code);
        
      })
      .catch((error) => {
        const msg = errorMsg(error);
        toast.error(msg);
      });
  };









  // const fetchCategories = async () => {
  //   dispatch(actionsCreator.FETCH_CATEGORIES_GLOBAL());
  // };



  //qwert
  return (
    <form className="add-product-wrapper" encType="multipart/form-data">
      <div className="flex-right">
        <h4 onClick={() => closeModal(false)}>✕</h4>
      </div>
      <h3>Add Category:</h3>
     
    
      <InputField
        type="text"
        className="input mt-2"
        name="category_name"
        id="category_name"
        placeholder="category name"
        value={item.category_name}
        onChange={handleAddItem}
        required
      />
      
      <InputField
        type="text"
        className="input mt-2"
        name="description"
        id="description"
        placeholder="Description"
        value={item.description}
        onChange={handleAddItem}
        required
      />
      {/* <input type="file" name="image" onChange={handleAddItem}/> */}
      <label htmlFor="home_page">Show this category on home page</label>
      <input
        type="checkbox"
        className="input mt-2"
        name="home_page"
        id="honme_page"
        placeholder="show this on home page"
        value={item.home_page}
        onChange={handleAddItem}
        checked={item.home_page}
      />

      
      <div className="option-buttons save-changes-buttons">
        <button onClick={handleSubmit}>Save</button>
      </div>
    </form>
  );
}

export default AddCategoryModal;
