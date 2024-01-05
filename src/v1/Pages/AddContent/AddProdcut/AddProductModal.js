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

////
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
  const addProduct = async (data)=>{
    const response = await axios.post(`${getBaseUrl}/api/shop/post/add_product/`,
    data,{ headers: {
      'Content-type': 'multipart/form-data',
      'Accept': '*/*'
    }})
    return response
  }

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


  // console.log(productsearch)

  /////
  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  //////
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      barcode: product_barcode,
      product_name: item.product_name,
      price: item.price,
      description: item.description,
      sku: item.sku,
      photo: image
    };


    if (product) {
      data["id"] = item.id
    }

    if(categoryId){
      data["category_id"]=categoryId
    }

    if(image){
      data["photo"] = image
    }
    
    const formData = new FormData();
    console.log(image)
    console.log(product_barcode) 

    formData.append('image', image);
    formData.append("product_barcode", product_barcode)
    
    console.log(formData.get('image'),"form data");
    console.log(data);


    // product ?
    // editProduct(data)
    // .then((res) => {
    //   if (res.status === 200) {

    //     toast.success("Product updated successfully.");
    //     handleResponse({id : "product", data : res.data})

    //     closeModal(false);
    //   } else if (res.status === 400) {
    //     toast.success("Please fill values correctly.");
    //   }

    // }).catch((err) => {
    //   const msg = errorMsg(err);
    //   toast.error(msg);
    // }) : addProductToCat ?  addProductToCategory(data)
    // .then( (res) => {
    //   console.log(res,"add to category result");
    //   if(res.status === 201){
    //     console.log(201);
    //     toast.success("Product Added Successfully");

    //     handleResponse({ id : "product", data : res.data });
    //     closeModal(false);
    //   }else if(res.status === 400){
    //     toast.error("Please fill values correctly.")
    //   }

    //   return;
    // })
    // .catch((err) => {
    //   toast.error(errorMsg(err))

    //   return;
    // }) :
    // addProduct(data)
    // .then((res) => {
    //   // console.log(res);
    //   if (res.status === 201) {
    //     toast.success("Product added successfully.");
    //     handleResponse({id : "product", data : res.data})         
    //     closeModal(false); 

    //   } else if (res.status === 400) {
    //     toast.success("Please fill values correctly.");
    //   }
    // })
    // .catch((error) => {
    //   const msg = errorMsg(error);
    //   toast.error(msg);
    // });


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
    console.log(e);
    if (Array.isArray(e)) {
      const temp = e.map((x) => x.value);
      setCategories(temp);
    }
  };

  // const fetchCategories = async () => {
  //   dispatch(actionsCreator.FETCH_CATEGORIES_GLOBAL());
  // };

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
          height: '4rem',
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
          required
        />
        
      </div>

      <div className="input-border">
        <Select
          className="dropdown"
          placeholder={"Category"}
          options={data}
          onChange={handleCategoryChange}
          isMulti
          isClearable
        />
      </div>


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