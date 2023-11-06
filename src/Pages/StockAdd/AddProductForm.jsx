import React, { useState } from "react";
import axios from "axios";
import { post_product } from "../../api/request.api";
import './form.css';

function AddProductForm({ setShowModal,getStock }) {

  const [item, setItem] = useState({
    product_name: "",
    price: "",
    description: "",
    sku: "",
  });
  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("loader-up").classList.toggle("loader-show");
    let data = {
        product_name: item.product_name,
        price: item.price,
        description: item.description,
        sku: item.sku,
    };
    axios({
      url: `${post_product}`,
      method: "POST",
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 201) {
          document.getElementById("form").reset();

          setTimeout(() => {
            document
              .getElementById("loader-up")
              .classList.toggle("loader-show");
              getStock();

            setShowModal(false);
          }, 2000);
          // setLoading(false)
        } else if (res.data.status === 400) {
          // setLoading(false);
          setTimeout(() => {
            document
              .getElementById("loader-up")
              .classList.toggle("loader-show");
          }, 2000);
          alert("Please fill values correctly!");
        }
      })
      .catch((error) => {
        // setLoading(false)
        setTimeout(() => {
          document.getElementById("loader-up").classList.toggle("loader-show");
        }, 2000);
        console.log("NETWORK ERROR!");
        alert("Network Error");
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <input
            type="text"
            className="input mt-2"
            name="product_name"
            id="product_name"
            placeholder="Product name"
            value={item.product_name}
            onChange={handleAddItem}
            required
          />
          <input
            type="number"
            className="input mt-2"
            name="price"
            id="price"
            placeholder="Price"
            value={item.price}
            onChange={handleAddItem}
            required
          />
          <input
            type="text"
            className="input mt-2"
            name="description"
            id="description"
            placeholder="Description"
            value={item.description}
            onChange={handleAddItem}
            required  
          />
          {/* <input
            type="text"
            className="input mt-2"
            name="sku"
            id="sku"
            placeholder="Sku"
            value={item.sku}
            onChange={handleAddItem}
          /> */}
        </div>
      </div>
      <div className="btn-container">
        <div className="mt-3 text-center">
          <button
            className="btn btn-light px-2 submit_button"
            onClick={handleSubmit}
          >
            Submit Products
          </button>
        </div>
          <div className="mt-3 text-center">
            <button
              className="btn btn-outline-light px-2 submit_button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
      </div>
    </div>
  );
}

export default AddProductForm;
