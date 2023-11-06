import React, { useState } from "react";
import axios from "axios";
import { post_inventory } from "../../api/request.api";
import './form.css'

function AddInventoryForm({ setShowModal,getStock}) {
  const [item, setItem] = useState({
    name: "",
    address: "",
    code: "",
    pincode: "",
    longitude: "",
    latitude: "",
  });
  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("loader-up").classList.toggle("loader-show");
    let data = {
      name: item.name,
      address: item.address,
      code: item.code,
      pincode: item.pincode,
      longitude: item.longitude,
      latitude: item.latitude,
    };
    axios({
      url: `${post_inventory}`,
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
            name="name"
            id="name"
            placeholder="Enter Name"
            value={item.product_name}
            onChange={handleAddItem}
            required
          />
          <textarea
            className="input mt-2"
            name="address"
            id="address"
            placeholder="Enter Address"
            value={item.address}
            onChange={handleAddItem}
            required
          />
          <input
            type="text"
            className="input mt-2"
            name="code"
            id="code"
            placeholder="Enter Code"
            value={item.code}
            onChange={handleAddItem}
            required
          />
          <input
            type="text"
            className="input mt-2"
            name="pincode"
            id="pincode"
            placeholder="Enter Pincode"
            value={item.pincode}
            onChange={handleAddItem}
            required
          />
          <input
            type="text"
            className="input mt-2"
            name="longitude"
            id="plongitude"
            placeholder="Enter Longitude"
            value={item.longitude}
            onChange={handleAddItem}
          />
          <input
            type="text"
            className="input mt-2"
            name="latitude"
            id="latitude"
            placeholder="Enter Latitude"
            value={item.latitude}
            onChange={handleAddItem}
          />
        </div>
      </div>
      <div className="btn-container">
        <div className="mt-3 text-center">
          <button
            className="btn btn-light px-2 submit_button"
            onClick={handleSubmit}
          >
            Submit Inventory
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

export default AddInventoryForm;
