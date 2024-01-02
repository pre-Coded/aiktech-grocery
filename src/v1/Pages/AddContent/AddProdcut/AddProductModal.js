import React, { useState } from "react";
import {
  addProduct,
  editProduct,
  fetchCategories,
  fetchleafcategory,
} from "../../../Api/productAPI";

// import '../../AddStock/form.scss'

import { toast } from "react-toastify";
import InputField from "../../../Components/InputField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  formatOptions,
  errorMsg,
  isNewLine,
  removeNewLine,
} from "../../../Utils/general-utils";

const mapStateToProps = ({ stockdropdown, categories = {}, productsearch = [] }) => ({
  stockdropdown,
  categories,
  productsearch
});

////
function AddProductModal({ closeModal, setBarcode, product }) {
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
  });

  useEffect(() => {

    if (product) {
      setItem({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        description: product?.description,
        category: product.category?.id,
        barcode: product.barcode
      })
    }

  }, [])

  const [product_barcode, setProductBarcode] = useState("");
  const [leafCategories, setLeafCategories] = useState(null);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);


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
      //   category: categories,
    };
    if (product) {
      data["id"] = item.id
    }

    product ? editProduct(data).then((res) => {
      if (res.status === 200) {
        toast.success("Product updated successfully.");
        closeModal(false);
      } else if (res.status === 400) {
        toast.success("Please fill values correctly.");
      }

    }).catch((err) => {
      const msg = errorMsg(err);
      toast.error(msg);

    }) : addProduct(data)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 201) {
          toast.success("Product added successfully.");
          closeModal(false);

          productsearch.push(res.data.data ? res.data.data[0] : {});


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

  //qwert
  return (
    <form className="add-product-wrapper flex-column gap-10">
      <div className="text-large text-bold-md" style={{textAlign : 'center'}}>Add Product</div>

      {!product &&
        <input
          className="input-border"

          type={"text"}
          name="product_barcode"
          id="product_barcode"
          placeholder="Barcode"
          value={product_barcode}
          onChange={(e) => {
            setProductBarcode(e.target.value);
          }}
          required
        />
      }

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

      <input 
        className="input-border"
        type={"text"}

        name="price"
        id="price"
        placeholder="Price"
        value={item.price}
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

      <div className="option-buttons save-changes-buttons">
        <button className="btn-none btn-outline" onClick={() => closeModal(false)}>
          Discard
        </button>
        <button className="btn-none btn-primary" onClick={handleSubmit}>Save</button>
      </div>
    </form>
  );
}

export default AddProductModal;
