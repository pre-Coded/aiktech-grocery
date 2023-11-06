import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressAPI, cartAPI, authAPI } from "../../Api";
import { CheckoutAddress, Button, Alert } from "../../Components";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import "./EverythingDelivery.scss";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import deleteIcon from "../../Assets/Icons/delete.svg";
import get from "lodash/get";
import Modal from "../../Components/Modal/";
import { stepHandler } from "../../Utils";

const mapStateToProps = ({ auth, everythingDelivery }) => ({
  auth,
  everythingDelivery,
});

export default function EverythingDelivery() {
  const { auth, everythingDelivery = {} } = useSelector(mapStateToProps);
  const cartData = get(everythingDelivery, "items", []);
  const { isLoggedIn = false } = auth;
  const [selectedAddress, setSelectedAddress] = useState();
  const [newAddress, setNewAddress] = useState();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [operational, setOperational] = useState(false);
  const [unoperationalMessage, setUnoperationalMessage] = useState("");
  // const [ra]

  useEffect(() => { 
    fetchUserDetails()
  }, [])
  

  const updateAddress = (key, val) => {
    if (key === "new") {
      setNewAddress(val);
      if (val) {
        setSelectedAddress("");
      }
    } else {
      setSelectedAddress(val);
      if (val) {
        setNewAddress("");
      }
    }
  };

  const onChangeHandler = (e, key) => {
    const value = e.target.value;
    if (key === "PRODUCT") {
      setProduct(value);
    } else if (key === "DESCRIPTION") {
      setDescription(value);
    }
  };

  const addItem = () => {
    if (product === "" || description === "") {
      toast.error("Please add product and description");
    } else {
      if (product && quantity) {
        let payload = {
          product_name: product,
          product_quantity: quantity,
          product_description: description,
        };
        let cartObj = [...cartData];
        cartObj.push(payload);
        updateCartData(cartObj);
        clearInputs();
      }
    }
  };

  const clearInputs = () => {
    setDescription("");
    setQuantity(1);
    setProduct("");
  };

  const deleteItem = (index) => {
    let cartObj = [...cartData];
    cartObj.splice(index, 1);
    updateCartData(cartObj);
  };

  const updateCartData = (data) => {
    dispatch(actionsCreator.SET_EVERYTHING_ITEMS({ items: data }));
  };

  const fetchUserDetails = async ()=>{
    const res = await authAPI.fetchUserDetails();
    if (res.data){
      setOperational(!res.data.operational)
      setUnoperationalMessage(res.data.unoperational_message)
    }
  }
  const addAddress = async (address) => {
    try {
      const payload = {
        value: address,
        value_type: 3,
        pk: "",
      };
      const res = await addressAPI.addAddresses(payload);
      if (res) {
        toast.success("Address is added successfully");
      }
    } catch (error) {
      toast.error("Error while adding address");
    }
  };

  const checkoutHandler = () => {
    if (cartData && cartData.length === 0 && !product && !description) {
      toast.error("Please add product and description");
    } else {
      if (isLoggedIn) {
        placeOrder();
      } else {
        dispatch(actionsCreator.SHOW_LOGIN());
      }
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      if (!isLoggedIn) {
        dispatch(actionsCreator.SHOW_LOGIN());
      } else {
        // Address check for empty string.
        if (!selectedAddress && !newAddress) {
          setLoading(false);
          return toast.error("Address can't be empty !");
        }

        const payload = {
          address: newAddress || selectedAddress,
          order_list: [...cartData],
        };
        if (product && description) {
          payload.order_list.push({
            product_name: product,
            product_description: description,
            product_quantity: quantity,
          });
        }

        const res = await cartAPI.placeEverythingDelivery(payload);
        toast.success("Order is placed successfully");
        dispatch(actionsCreator.RESET_EVERYTHING_ITEMS());
        if (newAddress) {
          addAddress(newAddress);
        }
        history.push("/order-placed");
      }
    } catch (error) {
      toast.error("Error while creating order");
      setLoading(false);
    }
  };

  const hideStepModal = () => {
    setShowStep(false);
    if (dontShow) {
      localStorage.setItem("hideStep", "true");
    }
  };

  const [showStep, setShowStep] = useState(false);

  useEffect(() => {
    const hideStep = stepHandler();
    setShowStep(!hideStep);
  }, []);

  const changeHandler = (e) => {
    let checked = get(e, "target.checked", false);
    setDontShow(checked);
  };

  return (
    <>
     {isLoggedIn?<Alert />: null}
    <div className="everything-delivery-wrapper">
      <Modal show={operational}>
        <div className="home-page-modal">
          <h5>{unoperationalMessage}</h5>
        </div>
      </Modal>
      <Modal show={showStep} onClose={() => hideStepModal()}>
        <div className="everything-delivery-modal">
          <p className="cross" onClick={() => hideStepModal()}>
            ✕
          </p>
          <div className="modal-container">
            <h3>Make your own list</h3>
            <ol>
              <li>
                Can't find what you're looking for. Don't worry, we've got you!
              </li>
              <li>
                Make your own list of all the products you want. We'll get them
                to you!
              </li>
              <li>
                Select the correct quantity using
                <div className="counter">
                  <button className="minus disable-button">-</button>1
                  <button className="plus disable-button">+</button>
                </div>
                and click the
                <button className="add disable-button">ADD</button> to add the
                product to a list.
              </li>
              <li>
                Keep adding all products and place order once you're finished
                using
                <Button
                  className="checkout-button noHover disable-button"
                  text={isLoggedIn ? "Place Order" : "Checkout"}
                />
              </li>
              <div className="checkbox">
                <input type="checkbox" onChange={(e) => changeHandler(e)} />
                <span>Don't show it again</span>
              </div>
            </ol>
          </div>
        </div>
      </Modal>
      <div className="everything-delivery-container">
        <div className="table__wrapper">
          <h3 className="Page_Heading">Make Your Own List</h3>
          <div className="topbar">
            <input
              type="text"
              placeholder="Product Name"
              style={{ backgroundColor: "white" }}
              onChange={(e) => onChangeHandler(e, "PRODUCT")}
              value={product}
              required
            />
            <div className="line">|</div>
            <input
              type="text"
              placeholder="Description"
              style={{ backgroundColor: "white" }}
              onChange={(e) => onChangeHandler(e, "DESCRIPTION")}
              value={description}
              required
            />
            <div className="counter-container">
              <div className="counter">
                <button
                  className="minus"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                {quantity}
                <button
                  className="plus"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button className="add" onClick={addItem}>
                ADD
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product__details__table">
              {cartData.map((product, index) => {
                const { product_quantity, product_name, product_description } =
                  product;
                return (
                  <tr key={index}>
                    <td>{product_name}</td>
                    <td>{product_description}</td>
                    <td>{product_quantity}</td>
                    <td>
                      <div onClick={() => deleteItem(index)}>
                        <img src={deleteIcon} className="cursor" alt="Delete" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        {isLoggedIn && (
          <CheckoutAddress
            updateAddress={updateAddress}
            selectedAddress={selectedAddress}
            newAddress={newAddress}
          />
        )}
      </div>
      <div className="checkout-button">
        <Button
          loading={loading}
          className="checkout-button"
          text={isLoggedIn ? "Place Order" : "Checkout"}
          clicker={checkoutHandler}
        />
      </div>
    </div>
    </>
  );
}
