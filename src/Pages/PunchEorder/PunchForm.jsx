import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  place_order_everythin,
  serachUser,
  productSearch,
  units
} from "../../api/request.api";
import "./PunchForm.css";

export default function PunchForm() {
  const initialState = {
    name: "",
    phone: "",
    address: "",
    delivery_charge: 10,
    packaging_charge: 0,
    schedule_time: ""
  };

  const [state, setstate] = useState(initialState);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_description: "",
    product_unit: "",
    product_id: ""
  });

  const [redirect, setRedirect] = useState(false);
  const [show] = useState(true);
  //  Search User
  const [suggestions, setSuggestions] = useState([]);
  //  Search Product
  const [productSuggestions, setProductSuggestions] = useState([]);

  const [unitValue, setUnitValue] = useState([]);
  useEffect(() => {
    axios
      .get(units)
      .then((res) =>
        setUnitValue((preValues) => preValues.concat(res.data.data))
      )
      .catch((err) => console.error(err));
  }, []);
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
    if (e.target.name==="phone"){
      handleSearchUser(e)
    }
  };
  const handleitem = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    if (e.target.name==="product_name"){
      handleSearchProduct(e)
    }
    
  };

  const onSuggestHandler = (name, phone, address) => {
    setstate({ ...state, name: name, phone: phone, address:  address});
    setSuggestions([]);
  };
  const onProductSuggestHandler = (title, price, description, id) => {
    setItem({
      ...item,
      product_id: id,
      product_name: `${title} ${description? `(${description})`: ''}`,
      product_price: price,
      product_description: description,
    });
    setProductSuggestions([]);
  };

  const getUser = (e) => {
    let q = e.target.value
    if (q){
      axios({
        url: `${serachUser}${q}/`,
        method: 'GET',
      })
      .then((res) => {
          if (res.data.status === 404) {
              console.log("Not Found")
              setSuggestions([])
          } else {
            setSuggestions(res.data.data)
          }
      })
      .catch((err) => {
          console.log("Network Error");
              
      }); 

    }
  }
  const getProduct = (e) => {
    let q = e.target.value
    if (q){
      axios({
        url: `${productSearch}${q}/`,
        method: 'GET',
      })
      .then((res) => {
          if (res.data.status === 404) {
              console.log("Not Found")
              setProductSuggestions([])
          } else {
            
            setProductSuggestions(res.data.search)
          }
      })
      .catch((err) => {
          console.log("Network Error");
      }); 

    }  
  }
  const debounce = function (getUser, d) {
  let timer;
  return function () {
      let context = this
      // args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
      getUser.apply(context, arguments);
      }, d);
  }
  }

const handleSearchUser = debounce(getUser, 400);
const handleSearchProduct = debounce(getProduct, 400);

  const unitMap= unitValue.map(({ unit }, index) => (
    <option key={index} value={unit}>
      {unit}
    </option>
  ))
  const handleadditem = (e) => {
    if (
      item.product_name !== "" &&
      item.product_price !== "" &&
      item.product_quantity !== "" &&
      item.product_unit!==""
    ) {
      let itemtemp = {
        product_name: item.product_name,
        product_price: item.product_price,
        product_quantity: item.product_quantity,
        product_description: item.product_description,
        product_unit: item.product_unit,
        product_id: item.product_id
      }
      setItems([...items, itemtemp]);
      setItem({
        product_name: "",
        product_price: "",
        product_quantity: "",
        product_description: "",
        product_unit: "",
      });
    }
    else{
      return alert("Please fill required fields correctly!")
    }
  };
  const handleRemoveItem = event => {
    const temp = [...items];
    temp.splice(event.target.getAttribute('data-index'), 1);
    setItems(temp);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true)
    document.getElementById("loader-up").classList.toggle("loader-show");
    if (
      item.product_name !== "" &&
      item.product_price !== "" &&
      item.product_quantity !== "" &&
      item.product_unit!==""
    ){
      let itemtemp = {
        product_name: item.product_name,
        product_price: item.product_price,
        product_quantity: item.product_quantity,
        product_description: item.product_description,
        product_unit: item.product_unit,
        product_id: item.product_id
      }
      items.push(itemtemp)
    }
    // else{
    //   document.getElementById("loader-up").classList.toggle("loader-show");
    //   return alert("Please fill required fields correctly!")
    // }
    let data = {
      items: items,
      name: state.name,
      address: state.address,
      phone: state.phone,
      delivery_charge: state.delivery_charge,
      packaging_charge: state.packaging_charge,
      schedule_time: state.schedule_time
    };
    if (data.phone.length<10) {
      document.getElementById("loader-up").classList.toggle("loader-show");
      return alert("Please enter a valid phone number");
    }
    if (items.length===0){
      document.getElementById("loader-up").classList.toggle("loader-show");
      return alert("please add required details")
    }
    axios({
      url: `${place_order_everythin}`,
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
          alert("Please fill order correctly!");
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
        autoComplete="new-password"
      >
        {/* For Input name details */}

        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="mobileno">Mobile No. *</label>
            </div>
            <div className="suggestionContainer">
              <input
                className="input mt-2"
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={state.phone}
                autoComplete="new-password"
                required
              />
              
            </div>
            <div
                style={{
                  border:
                    suggestions && suggestions.length > 0 &&
                    "1px solid transparent",
                  height: suggestions && suggestions.length > 0 && "80px",
                  overflowY: suggestions && suggestions.length > 0 && "scroll",
                }}
                className="suggestion mt-1 btn-secondary"
              >
                {suggestions &&
                  suggestions.map(({ name, phone, address }, index) => (
                    <div
                      key={index}
                      className="suggestionList"
                      onClick={() => onSuggestHandler(name, phone, address)}
                    >
                      {phone}
                    </div>
                  ))}
              </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="Name">Name *</label>
            </div>
            <input
              className="input mt-2"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={state.name}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="col-lg-3 col-md-4 col-syour optionm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="Address">Address *</label>
            </div>
            <input
              className="input mt-2"
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={state.address}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="Address">Delivery Charge *</label>
            </div>

            <input
              className="input mt-2"
              type="text"
              name="delivery_charge"
              id="delivery_charge"
              onChange={handleChange}
              value={state.delivery_charge}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="Address">Packaging Charge *</label>
            </div>

            <input
              className="input mt-2"
              type="text"
              name="packaging_charge"
              id="packaging_charge"
              onChange={handleChange}
              value={state.packaging_charge}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="label mt-3 py-3">
              <label htmlFor="Address">Delivery Time (Optional)</label>
            </div>

            <input
              className="input mt-2"
              type="datetime-local"
              name="schedule_time"
              id="schedule_time"
              onChange={handleChange}
              value={state.schedule_time}
              placeholder="DateTime"
              autoComplete="off"
            />
          </div>
          
        </div>
        {/* For Input name details */}

        {/* Heading for items */}
        <h3 className="my-4">Add Items:</h3>

        {/* Heading for items */}

        {/* Top Lable for inputs  */}
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-3">
            <div className="label mt-3 py-3">
              <label htmlFor="Name">Product Name</label>
            </div>
          </div>

          {/* <div className="col-lg-2 col-md-2 col-sm-2 col-3">
            <div className="label mt-3 py-3">
              <label htmlFor="mobileno">Des.</label>
            </div>
          </div> */}
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <div className="label mt-3 py-3">
              <label htmlFor="Address">Qty.</label>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <div className="label mt-3 py-3">
              <label htmlFor="product_Unit">Unit</label>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <div className="label mt-3 py-3">
              <label htmlFor="product_price">Price</label>
            </div>
          </div>
        </div>
        {/* Top Lable for inputs  */}

        {/* Border */}
        <div className="b-bottom w-100 my-1"></div>
        {/* Border */}

        {/* punched order */}
        {items.map((item, idx) => (
          <div className="row" key={idx}>
            <div className="col-lg-3 col-md-3 col-sm-3 col-3">
              <div className="label mt-3 py-3">
                <label htmlFor="Name">{item.product_name}</label>
              </div>
            </div>

            {/* <div className="col-lg-2 col-md-2 col-sm-2 col-3">
              <div className="label mt-3 py-3">
                <label htmlFor="mobileno">{item.product_description}</label>
              </div>
            </div> */}
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <div className="label mt-3 py-3">
                <label htmlFor="Address">{item.product_quantity}</label>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <div className="label mt-3 py-3">
                <label htmlFor="product_price">{item.product_unit}</label>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <div className="label mt-3 py-3">
                <label htmlFor="product_price">{item.product_price}</label>
              </div>
            </div>

            <div className="col-lg-1 col-md-1 col-sm-1 col-1">
              <div className="label mt-3 py-3">
                <label htmlFor="product_price">
                  <i className="fa fa-trash" onClick={handleRemoveItem} data-index={idx}></i>
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className="b-bottom w-100 my-1"></div>
        {/* punched order */}

        {/* For Product Input fields */}
        <div className=" mt-4 product_input" id="">
          <div className="m-2">
            <div className="suggestionContainer">
              <input
                className="input mt-2"
                type="text"
                name="product_name"
                id="product_name"
                // onKeyUp={handleSearchProduct}
                onChange={handleitem}
                onBlur={(e)=>{
                  if (productSuggestions<1){
                    setItem({...item, "product_name": "",})
                  }
                  
                }}
                value={item.product_name}
                placeholder="Product Name"
                autoComplete="off"
              />
            </div>
            <div
                style={{
                  border:
                  productSuggestions && productSuggestions.length > 0 &&
                    "1px solid transparent",
                  height:productSuggestions && productSuggestions.length > 0 &&  "120px",
                  overflowY: productSuggestions && productSuggestions.length > 0 &&  "scroll",
                }}
                className="suggestion mt-1 btn-secondary"
              >
                {productSuggestions &&
                  productSuggestions.map(
                    ({ title, price, description, id }, index) => (
                      <div
                        key={index}
                        className="suggestionList"
                        onClick={() =>
                          onProductSuggestHandler(title, price, description, id)
                        }
                      >
                        {title} {description? `(${description})`:null}
                      </div>
                    )
                  )}
              </div>
          </div>
          {/* <div className="m-2">
            <input
              className="input mt-2"
              type="text"
              name="product_description"
              id="product_description"
              onChange={handleitem}
              value={item.product_description}
              placeholder="Description"
              autoComplete="off"
            />
          </div> */}
          <div className="m-2">
            <input
              className="input mt-2"
              type="number"
              name="product_quantity"
              id="product_quantity"
              onChange={handleitem}
              value={item.product_quantity}
              placeholder="Quantity"
              autoComplete="off"
            />
          </div>
          <div className="m-2">
            <select
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="product_unit"
              data-toggle="dropdown"
              name="product_unit"
              onChange={handleitem}
              value={item.product_unit}
            >
              <option value="" disabled defaultValue>Select</option>
              {unitMap}
            </select>

          </div>
          <div className="m-2">
            <input
              className="input mt-2"
              type="number"
              name="product_price"
              id="product_price"
              onChange={handleitem}
              value={item.product_price}
              placeholder="Price"
              autoComplete="off"
            />
          </div>
        </div>
        {/* For Product Input fields */}

        <div className=" mt-3">
          {show ? (
            <button
              className="btn btn-outline-light mx-1"
              type="button"
              onClick={handleadditem}
            >
              <i className="fa fa-plus"></i>
            </button>
          ) : null}
        </div>

        <div className="mt-5 text-center">
          <button className="btn btn-light px-4 submit_button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </>
  );
}
