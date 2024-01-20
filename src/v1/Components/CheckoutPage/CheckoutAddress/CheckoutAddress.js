import React, { useEffect, useState } from "react";
import "./CheckoutAddress.scss";
import TextAreaField from "../../TextAreaField";
import { addressAPI } from "../../../Api";
import get from "lodash/get";
import Modal from "../../Modal/Modal";
import edit_icon from "../../../Assets/Icons/edit.svg";
import delete_icon from "../../../Assets/Icons/delete.svg";
import { AddressForm, InputField } from "../..";
import axios from "axios";
import { errorMsg } from "../../../Utils";
import { toast } from "react-toastify";
export default function CheckoutAddress({
  updateAddress,
  selectedAddress,
  newAddress,
}) {
  const [addresses, setAddresses] = useState([]);
  const [modal, setmodal] = useState(false);
  const [option, setOption] = useState();
  const onChange = (e) => {
    const value = e.target.value;
    updateAddress("new", value);
  };
  function sliceCoordinates(str, word = "coordinates{'lat'", option = -1) {
    if (option == -1)
      return str.substring(0, str.indexOf(word));
    else
      return str.substring(str.indexOf(word), str.length);
  }

  function findWord(str, word) {
    console.log(str);
    if(str==null || str=='') return false
    return str.indexOf(word) > -1;
  }

  useEffect(() => {
    if (document.querySelector(".edit_address")) {
      if (findWord(selectedAddress, "coordinates{'lat'"))
        document.querySelector(".edit_address").value = sliceCoordinates(selectedAddress, "coordinates{'lat'")
      else
        document.querySelector(".edit_address").value = selectedAddress
    }
  }, [selectedAddress, modal])


  function sliceCoordinates(str, word) {
    return str.substring(0, str.indexOf(word));
  }


  const [edittedAddress, setedittedAddress] = useState("");
  const [edittingpk, setedittingpk] = useState(0);

  const editAddress = async (pk, address) => {
    try {
      let payload = {
        pk: "",
        type: 3,
        value: "",
      };
      payload.pk = parseInt(pk);
      payload.value = address;
      if (address !== "") {
        await addressAPI.editAddresses(payload);
        toast.success('Address is added successfully');
        setmodal(false);
        fetchAddresses();
      }

    } catch (error) {
      const errMsg = errorMsg(error);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
  }, [edittedAddress]);

  const fetchAddresses = async () => {
    try {
      const res = await addressAPI.fetchAddresses();
      const addresses = get(res, "data.data");
      console.log(res)
      console.log(addresses);
      setAddresses(addresses);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedAddress)
  }, [selectedAddress])

  //function to get string after a word is encountered
  function sliceAfterWord(str, word = "coordinates{'lat'") {
    if (findWord(str, word))
      return str.substring(str.indexOf(word));
    else
      return ""
  }

  return (
    <div className="checkout-address-wrapper">
      <Modal show={modal} onClose={() => setmodal(false)}>
        {option === "edit" ? (
          <form className="address-option-container">
            <h4 onClick={() => setmodal(false)}>✕</h4>
            <h5>Edit Address</h5>
            <TextAreaField
              autoFocus="true"
              onChange={(e) => setedittedAddress(e.target.value + sliceAfterWord(selectedAddress))}
              placeHolder={sliceCoordinates(selectedAddress, "coordinates{'lat'")}
              className='edit_address'
            />
            <div className="option-buttons save-changes-buttons">
              <button
                onClick={() => {
                  setmodal(false);
                  setedittedAddress("");
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  editAddress(edittingpk, edittedAddress);
                }}
                className="save-btn"
                type="button"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="address-option-container">
            <h4 onClick={() => setmodal(false)}>✕</h4>
            <h5 className="delete-message">
              Are you sure you want to delete this address?
            </h5>
            <div className="option-buttons delete-buttons">
              <button onClick={() => setmodal(false)} className="cancel-btn">
                Cancel
              </button>
              <button className="save-btn">Yes</button>
            </div>
          </div>
        )}
      </Modal>
      <div className="checkout-trace">
        {/* <span className="active-trace">
                    Shipping
                </span>

                <span className="active-dash">
                </span>

                <img
                    src={check}
                    alt=""
                />

                <span className="active-dash">
                </span> */}

        {/* <span className="active-trace dim-trace">
                    Payment
                </span> */}
      </div>
      <h5>ADDRESSES</h5>

      {addresses && addresses.length > 0  ? (
        <div className="addresses-list">
          {addresses.map((address) => {
            return address["value"] && (
              <div
                key={address.pk}
                className={`address-card ${address.value === selectedAddress ? "selected" : ""
                  }`}
                onClick={() => updateAddress("selected", address.value)}
              >
                <div className={`circle`}></div>
                {findWord(address.value, "coordinates{'lat'") ? sliceCoordinates(address.value, "coordinates{'lat'") : address.value}
                {address.pk && (
                  <div className="address-icon-wrapper">
                    <img
                      onClick={() => {
                        setOption("edit");
                        setmodal(true);
                        setedittingpk(address.pk);
                      }}
                      className="address-icon-image"
                      src={edit_icon}
                      alt=""
                    />
                    {/* <img onClick={() => {
                                            setOption('delete');
                                            setmodal(true);

                                        }} className='address-icon-image' 
                                        src={delete_icon} alt="" 
                                        /> */}
                  </div>
                )}
              </div>
            );
          }).reverse()}
        </div>
      ) : null}
      {addresses && addresses.length > 0 && addresses["address"] ? (
        <div className="or">
          <h6>
            <span>or</span>
          </h6>
        </div>
      ) : null}
      <form className="address-form">
        <h5>Add New Address</h5>
        {/* <div className="form-input">

                    <label htmlFor="name">Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        required
                    />

                </div>
                <div className="form-input">

                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        className="input"
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        required
                    />

                </div> */}
        <AddressForm
          labels="true"
          valueTransfer={updateAddress}
          showButton={true}
        />
        {/* <div className="form-input">

                    <label htmlFor="address">Add {addresses &&  addresses.length > 0? "New": null} Address</label>
                    <TextAreaField
                        className="input"
                        type="textarea"
                        required
                        value={newAddress}
                        onChange={onChange}
                    />
                </div> */}
      </form>
    </div>
  );
}
