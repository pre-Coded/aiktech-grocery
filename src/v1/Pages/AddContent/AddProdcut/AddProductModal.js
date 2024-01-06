import React, { useState } from "react";
import {
  editProduct,
  fetchCategories,
  fetchleafcategory,
} from "../../../Api/productAPI";

// import '../../AddStock/form.scss'
import defaultImg from '../../../Assets/Images/default-image.png'

import { toast } from "react-toastify";
import InputField from "../../../Components/InputField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../Api/productAPI";

import Select from 'react-select'

import {
  formatOptions,
  errorMsg,
  isNewLine,
  removeNewLine,
} from "../../../Utils/general-utils";

import { addProductToCategory } from "../../../Api/dashboardAPI";

import axios from "axios";
import { getBaseUrl } from "../../../Lib/NetworkHandler";

const mapStateToProps = ({ stockdropdown, categories = {}, productsearch = [] }) => ({
  stockdropdown,
  categories,
  productsearch
});

function AddProductModal({ closeModal, setBarcode, product, handleResponse, addProductToCat, categoryId }) {
  const {
    stockdropdown: { list: stockdropdownList },
    categories: { globalCategories: categoryList },
    productsearch: { results: productsearch = [] },
  } = useSelector(mapStateToProps);

  const dispatch = useDispatch();

  const [item, setItem] = useState({
    product_name: "",
    price: "",
    description: "",
    sku: "",
    category: null,
    photo: null
  });

  useEffect(() => {

    if (product) {
      setItem({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        description: product?.description,
        category: product.category?.id,
        barcode: product.barcode,
      })
    }

  }, [])

  const [product_barcode, setProductBarcode] = useState("");
  const [leafCategories, setLeafCategories] = useState(null);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);


  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });
 
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      barcode: product_barcode,
      product_name: item.product_name,
      price: item.price,
      description: item.description,
      sku: item.sku,
      photo: image,
      categories: categories
    };


    if (product) {
      data["id"] = item.id
    }

    if(categoryId){
      data["category_id"]= categoryId
    }
    if(image){
      data["photo"] = image
    }

   
    addProductToCat ? 
    addProductToCat(data)
    .then((res) => {
      if(res.status === 201){
        toast.success("Product added successfully.");
        handleResponse({ type : "product", itemId : res.data.id , data : res.data})         
        closeModal(false); 
      }else{
        toast.error("Please fill the values correctly.");
      }
    })
    .catch((err) => {
      toast.error("Adding product to category failed.")
    })
    : 
    (
    product ?
    editProduct(data)
    .then((res) => {
      if (res.status === 200) {

        toast.success("Product updated successfully.");

        handleResponse({ type : "product", itemId : res.data.id , data : res.data})

        closeModal(false);
      } else if (res.status === 400) {
        toast.success("Please fill values correctly.");
      }

    }).catch((err) => {
      const msg = errorMsg(err);
      toast.error(msg);
    }) 
    : 
    addProduct(data)
    .then((res) => {
      if (res.status === 201) {
        toast.success("Product added successfully.");
        handleResponse({ type : "product", itemId : res.data.id , data : res.data})         
        closeModal(false); 

      } else if (res.status === 400) {
        toast.success("Please fill values correctly.");
      }
    })
    .catch((error) => {
      const msg = errorMsg(error);
      toast.error(msg);
    })
    )
  };

  const fetchCategories = async () => {
    const cate = await fetchleafcategory({ leaf: "leaf" });
    setLeafCategories(cate.data.data);
  };

  useEffect(() => {
    if (leafCategories) {
      setData(formatOptions(leafCategories, "name", "id"));
    }
  }, [leafCategories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    let element = document.querySelector("#product_barcode");
    if (element) {
      element.focus();
    }
  }, []);


  const handleCategoryChange = (e) => {
    if (Array.isArray(e)) {
      const temp = e.map((x) => x.value);
      setCategories(temp);
    }
  };



  useEffect(() => {
    if (
      product_barcode !== "" &&
      product_barcode &&
      isNewLine(product_barcode)
    ) {
      let changedBarcode = removeNewLine(product_barcode);
      setProductBarcode(changedBarcode);
    }
  }, [product_barcode]);

 
  return (
    <form className="add-product-wrapper flex-column gap-10" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="text-large text-bold-md" style={{textAlign : 'center'}}>Add Product</div>


      <input 
        className="input-border"
        type={"text"}
        name="product_name"
        id="product_name"
        placeholder="Product name"
        value={item.product_name}
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

      {!product &&
        <input
          className="input-border"

          type={"text"}
          name="product_barcode"
          id="product_barcode"
          placeholder="Barcode (optional)"
          value={product_barcode}
          onChange={(e) => {
            setProductBarcode(e.target.value);
          }}       
        />
      }

      <div className={'input-border flex-row items-center gap-10'}>

        <div className={'overflow-hidden'} style={{
          height: '2.5rem',
          maxHeight: '2.5rem',
          aspectRatio: '1',
        }}>
          <img
            src={image ? URL.createObjectURL(image) : defaultImg} 
            alt="Selected"
            name={'image'}
            style={{
              height: '100%',
              aspectRatio: '1',
              objectFit: 'contain',
            }}
          />
        </div>

        <input
          type={'file'}
          name="photo"
          onChange={(event) => {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
          }}
          
        />
        
      </div>


        <Select
          placeholder={"Category"}
          options={data}
          onChange={handleCategoryChange}
          isMulti
          isClearable
        />



      <div className="option-buttons save-changes-buttons">
        <button className="btn-none btn-outline" onClick={() => closeModal(false)}>
          Discard
        </button>
        <button className="btn-none btn-primary" >Save</button>
      </div>
    </form>
  );
}

export default AddProductModal;