import React, { useState } from "react";
import { addInventory } from "../../Api/productAPI"
import './form.scss'
import { toast } from "react-toastify";
import InputField from '../../Components/InputField'

function AddInventoryForm({ closeModal, dropdown }) {
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
    // document.getElementById("loader-up").classList.toggle("loader-show");
    let data = {
      name: item.name,
      address: item.address,
      code: item.code,
      pincode: item.pincode,
      longitude: item.longitude,
      latitude: item.latitude,
    };
    addInventory(data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 201) {
          // document.getElementById("form").reset();
          closeModal(false, dropdown?false:true)
          toast.success("Inventory added succesfully")
          // setLoading(false)
        } else if (res.data.status === 400) {
          // setLoading(false);
          
          alert("Please fill values correctly!");
        }
      })
      .catch((error) => {
        // setLoading(false)
        setTimeout(() => {
          // document.getElementById("loader-up").classList.toggle("loader-show");
        }, 2000);
        console.log("NETWORK ERROR!");
        alert("Network Error");
      });
  };
  return (
    <form className='address-option-container'>
        <h4 onClick={() => closeModal(false, false)}>✕</h4>
        <h3>Add Inventory:</h3>
        <InputField
            type="text"
            className="input_form"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={item.product_name}
            onChange={handleAddItem}
            required
          />
          <div className="input-container">
            <textarea
              style = {{ height: "80px", padding: "15px" }}
              className="input_form"
              name="address"
              id="address"
              placeholder="Enter Address"
              value={item.address}
              onChange={handleAddItem}
              required
            />
          </div>
          
          <InputField
            type="text"
            className="input_form"
            name="code"
            id="code"
            placeholder="Enter Code"
            value={item.code}
            onChange={handleAddItem}
            required
          />
          <InputField
            type="text"
            className="input_form"
            name="pincode"
            id="pincode"
            placeholder="Enter Pincode"
            value={item.pincode}
            onChange={handleAddItem}
            required
          />
          <InputField
            type="text"
            className="input_form"
            name="longitude"
            id="plongitude"
            placeholder="Enter Longitude"
            value={item.longitude}
            onChange={handleAddItem}
          />
          <InputField
            type="text"
            className="input_form"
            name="latitude"
            id="latitude"
            placeholder="Enter Latitude"
            value={item.latitude}
            onChange={handleAddItem}
          />
        <div className='option-buttons save-changes-buttons'>
            {/* <button onClick={() => setModal(false)}>Cancel</button> */}
            <button onClick={handleSubmit}>Save</button>
        </div>
    </form>
      
  );
}

export default AddInventoryForm;
