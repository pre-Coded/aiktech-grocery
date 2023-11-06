import React, { useState } from "react";
import "./Requestform.css";
import { Redirect } from "react-router-dom";
// import marker from './mark.svg'
import axios from "axios";
import { placeOrder } from "../../api/request.api";
// import Loader from '../Loader/Loader'
import scooter from "./scooter.svg";
export default function Requestform() {
  // For order list
  const [list, setList] = useState([]);
  const [item, setItem] = useState({
    product_name: "",
    product_quantity: "",
    product_description: "",
  });
  const initialState = {
    name: "",
    phone: "",
    store_name: "",
    address: "",
  };

  let d = Boolean(localStorage.getItem("toggle")) ? "EVERYTHING" : "EXPRESS";

  const [delivery_type] = useState(d);
  const [state, setstate] = useState(initialState);

  // const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleitem = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const removeTags = (index) => {
    setList([...list.filter((indx) => list.indexOf(indx) !== index)]);
  };
  const handleadditem = (e) => {
    if (item.product_name !== "") {
      setList([...list, item]);
      setItem({
        product_name: "",
        product_quantity: "",
        product_description: "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true)
    document.getElementById("loader-up").classList.toggle("loader-show");
    
    if (item.product_name!==""){
      list.push(item)
    }
    console.log(list)
    let data = {
      order_list: list,
      address: state.address,
      store_name: state.store_name,
    };
    axios({
      url: `${placeOrder}-1/${state.phone}/${state.name}/${delivery_type}/`,
      method: "POST",
      data: data,
    })
      .then((res) => {
        if (res.data.status === 201) {
          console.log("Order Placed");
          document.getElementById("form").reset();
          setTimeout(() => {
            document
              .getElementById("loader-up")
              .classList.toggle("loader-show");
            setRedirect(true);
          }, 2000);
          // setLoading(false)
        } else if (res.data.status === 400) {
          // setLoading(false);
          setTimeout(() => {
            document
              .getElementById("loader-up")
              .classList.toggle("loader-show");
          }, 2000);
          alert("Phone number must be valid.");
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

  if (redirect) {
    return <Redirect to="/order-placed" />;
  }
  return (
    <>
      <form
        className="forms"
        onSubmit={handleSubmit}
        id="form"
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="name">Name *</label>
            </div>
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={state.name}
              autoComplete="off"
              required
            />
            <p className="dim-text">
              We will use your name to send the invoice with a little thank you
              Card for ordering through us.
            </p>

            <div className="label mt-3 py-3">
              <label htmlFor="mobileno">Mobile No. *</label>
            </div>

            <input
              className="input"
              type="text"
              name="phone"
              id="mobileno"
              onChange={handleChange}
              value={state.phone}
              autoComplete="off"
              required
            />
            <p className="dim-text">
              Your mobile no. will be used to send you updates about your order.
              We will never spam you.
            </p>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 col-12"></div>
          <div className=" col-lg-6 col-md-4 col-12 col-sm-5 d-none d-md-block">
            <img src={scooter} alt="" className="scooter-img" />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 col-12">
          <div className="label mt-3 py-3">
            <label htmlFor="mobileno">Address (Optional)</label>
          </div>
          <textarea
            className="input mt-2"
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            value={state.address}
            autoComplete="off"
          />
          <p className="dim-text" id="dim-text-1">
            Put your address if you want to. If not, we will call you and ask
            for it.
          </p>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="label mt-3 py-3">
            <label htmlFor="mobileno">Order List (Optional)</label>
          </div>
          <ul className="tagContainer">
            {list.map(
              (
                { product_name, product_description, product_quantity },
                index
              ) => (
                <li className="tag" key={index}>
                  <span className="tagTitle">
                    {product_name}{" "}
                    {product_description.length > 0 &&
                      product_quantity.length > 0 && (
                        <>
                          <span>
                            (&nbsp;{product_description}&nbsp;) x &nbsp;
                            {product_quantity}
                          </span>
                        </>
                      )}{" "}
                    {product_quantity.length === 0 && (
                      <span>(&nbsp;{product_description}&nbsp;) x 1</span>
                    )}{" "}
                    {product_description.length === 0 && (
                      <span>&nbsp;{product_quantity} &nbsp;</span>
                    )}
                  </span>
                  <span className="tag-close-icon">
                    <i
                      className="fa fa-close"
                      onClick={() => removeTags(index)}
                    ></i>
                  </span>
                </li>
              )
            )}
          </ul>
          <div className="w-100 my-1">
            <div className="row " id="product_input">
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <input
                  className="input mt-2"
                  type="text"
                  name="product_name"
                  id="product_name"
                  onChange={handleitem}
                  value={item.product_name}
                  autoComplete="off"
                  placeholder="Product Name"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <input
                  className="input mt-2"
                  type="text"
                  name="product_description"
                  id="product_description"
                  onChange={handleitem}
                  value={item.product_description}
                  autoComplete="off"
                  placeholder="Description eg. kg,l,gm"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <input
                  className="input mt-2"
                  type="number"
                  name="product_quantity"
                  id="product_quantity"
                  onChange={handleitem}
                  value={item.product_quantity}
                  autoComplete="off"
                  placeholder="Quantity"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <button
                  className="btn btn-outline-light m-2 "
                  type="button"
                  onClick={handleadditem}
                  style={{ fontSize: "14px" }}
                >
                  <i className="fa fa-plus"></i> Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="mt-5 text-center">
          <button className="btn btn-light px-4 submit_button" type="submit">
            Ask Valet to Call
          </button>
          {/* <img src={marker} alt="" className="marker"/> */}
        </div>
      </form>
    </>
  );
}
