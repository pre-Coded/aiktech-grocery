import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import axios from "axios";
import {
  CheckoutBill,
  CheckoutAddress,
  Button,
  EmptyData,
  Modal,
  Alert
} from "../../Components";
import { addressAPI, cartAPI } from "../../Api";
import {
  handlePaymentSuccess,
  handlePaymentFailure,
} from "../../Api/paymentAPI";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import { extractFinalPrice, errorMsg } from "../../Utils";
import { toast } from "react-toastify";
import get from "lodash/get";
import { useHistory } from "react-router";
import logo from "../../Assets/Images/navbar/new_logo.svg";

const mapStateToProps = ({ cart, auth, payment }) => ({
  cart,
  auth,
  payment,
});

export default function Checkout() {
  const {
    cart: cartData,
    auth: { isLoggedIn = false },
    payment,
  } = useSelector(mapStateToProps);
  const {walletBalance = 0,isWallet = false} = payment
  const [selectedAddress, setSelectedAddress] = useState();
  const [mode_of_payment, setModeOfPayment] = useState();
  const [placeOrderBtn, setPlaceOrderBtn] = useState();
  const [showModal,setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState();
  const [modal, setModal] = useState(false);
  const [debit, setDebit] = useState(false);
  const [debitdata, setDebitdata] = useState({});
  const [cartid, setCartid] = useState(null);
  const [outOfStock, setOutOfStock] = useState([]) 
  const dispatch = useDispatch();
  const history = useHistory();
  const [wallet, setwallet] = useState(null);
  // const [isWallet, setIsWallet] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState();
  const [walletResponse, setWalletResponse] = useState({
    status: null,
    payment_id: null,
  });
  //   console.log(cartData);
  cartData.out_of_stock = outOfStock
  const { cartitem = [], delivery_charge, default_delivery_charge, previous_delivery_charge, transactionDebit, start_time } = cartData;
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartDetails();
    }
  }, [isLoggedIn]);

  const fetchCartDetails = async () => {
    dispatch(actionsCreator.SET_PREVIOUS_DELIVERY_CHARGE({previous_delivery_charge: cartData.delivery_charge}))
    dispatch(actionsCreator.FETCH_CART_DETAILS());
  };

  const removeItem = async (product) => {
    try {
      const { cartitem = [] } = cartData;
      let modifiedCartItems = [...cartitem];
      let modifiedItemIndex = modifiedCartItems.findIndex((item) => {
        return item.id === product.id;
      });
      if (modifiedItemIndex >= 0) {
        if (isLoggedIn) {
          modifiedCartItems[modifiedItemIndex]["quantity"] = 0;
          modifiedCartItems = modifiedCartItems.map((i) => {
            return { product: i.id, quantity: i.quantity };
          });
          //   console.log(modifiedCartItems, "items");
          const payload = {
            items: modifiedCartItems,
          };
          const res = await cartAPI.addCartItems(payload);
          toast.success("Item removed successfully.");
          fetchCartDetails();
        } else {
          modifiedCartItems.splice(modifiedItemIndex, 1);
          let { final_price = 0, final_item = 0 } =
            extractFinalPrice(modifiedCartItems);
          dispatch(
            actionsCreator.SET_CART_DATA({
              cartitem: modifiedCartItems,
              final_price,
              final_item,
            })
          );
          toast.success("Item removed successfully.");
        }
      }
    } catch (error) {
      const msg = errorMsg(error);
      toast.error(msg);
    }
  };

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

  const checkoutHandler = () => {
    if (isLoggedIn) {
      if (!selectedAddress && !newAddress)
        toast.error("Please select an address or add a new address.");
      else {
        placeOrder();
      }
    } else {
      dispatch(actionsCreator.SHOW_LOGIN());
    }
  }

  useEffect(() => {
    if (paymentStatus) {
      toast.success("Order is placed successfully");
      dispatch(actionsCreator.RESET_CART_DATA({}));
     
      if (newAddress) {
        addAddress(newAddress);
      }
      setShowModal(false)
      history.replace("/order-placed");
    } else if (paymentStatus === false) {
      setLoading(false);
      toast.error("Payment Failed... Try Again");
    }
  }, [paymentStatus]);

  const handle_payment_success = async (response, order_id, gateway) => {
    setShowModal(true)
    const payload = {
      order_id: order_id,
      response: response,
      gateway: gateway,
    };
    const res = await handlePaymentSuccess(payload);
    console.log(res);
    setPaymentStatus(true);
    setLoading(false);
  };

  const handle_payment_failure = async (response, order_id, gateway) => {

    const payload = {
      order_id: order_id,
      response: response,
      gateway: gateway,
    };
    const res = await handlePaymentFailure(payload);
    console.log(res);
    setPaymentStatus(false);
  };

  // Razorpay Start
  const showRazorpay = async (data) => {
    console.log(data.customer_name);
    var options = {
      key: data.RAZORPAY_API_KEY,
      amount: data.order_amount * 100,
      currency: "INR",
      name: "Phurti",
      description: "Phurti Instant Groceries",
      image: logo,
      order_id: data.razorpay_order_id, // Razorpay Order ID
      handler: function (response) {
        // If Payment Success
        handle_payment_success(response, data.order_id, data.mode_of_payment);
      },
      prefill: {
        "name": data.customer_name,
        "email": data.email,
        "contact": data.phone_no,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay Checkout Form closed");
          setLoading(false);
        },
      },
    };

    var rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
    rzp.on("payment.failed", function (response) {
      // If Payment Failure
      handle_payment_failure(response, data.order_id, data.mode_of_payment);
    });
  };
  // Razorpay End
  const showPaytm = (paymentData) => {
        var config = {
            "root":"",
            "style": {
              "bodyBackgroundColor": "#fafafb",
              "bodyColor": "",
              "themeBackgroundColor": "#3399cc",
              "themeColor": "#ffffff",
              "headerBackgroundColor": "#3399cc",
              "headerColor": "#ffffff",
              "errorColor": "",
              "successColor": "",
              "card": {
                "padding": "",
                "backgroundColor": ""
              }
            },
            "data": {
              "orderId": paymentData.payment_detail.order_id,
              "token": paymentData.payment_detail.token,
              "tokenType": "TXN_TOKEN",
              "amount": paymentData.payment_detail.amount /* update amount */
            },
            "payMode": {
              "labels": {},
              "filter": {
                "exclude": []
              },
              "order": [
                "UPI",
              ]
            },
            "website": paymentData.payment_detail.website,
            "flow": "DEFAULT",
            "merchant": {
              "mid": paymentData.payment_detail.mid,
              "redirect": false
            },
            "handler": {
              "transactionStatus":
              function transactionStatus(paymentStatus){
                // 	TXN_SUCCESS, TXN_FAILURE and PENDING
                if (paymentStatus.STATUS==="TXN_SUCCESS"){
                  // do success API
                  console.log("SUCCESS")
                  handle_payment_success(paymentStatus, paymentData.payment_detail.order_id, paymentData.mode_of_payment);

                }
                else if(paymentStatus.STATUS==="TXN_FAILURE"){
                  // Failure API
                  handle_payment_failure(paymentStatus, paymentData.payment_detail.order_id, paymentData.mode_of_payment);
                }
                else{

                }
                setLoading(false);
                document.querySelector("#app-close-btn").click()
              },
              "notifyMerchant":
              function notifyMerchant(eventName,data){
                console.log("Closed");
                setLoading(false);
              }
            }
        };
      
        if (window.Paytm && window.Paytm.CheckoutJS) {
       	window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
                console.log("Error => ", error);
          });
        }
      }		

  const paymentDebitor = async (data, payment_method) => {
    if (payment_method === "razorpay") {
      try {
        showRazorpay(data);   
      } catch (errors) {
        console.error(errors);
      }
    } 
    else if (payment_method === "paytm") {
      try { 
        showPaytm(data);
      } catch (errors) {
        console.error(errors);
      }
    }
    else if (payment_method === "wallet") {
      try {
        setShowModal(true)
        let walletData = {
          amount: cartData.final_price + delivery_charge,
          transaction_type: "DEBIT",
          order_id: data.order_id,
        };
        let response = await cartAPI.debitWallet(walletData);
        dispatch(actionsCreator.UPDATE_WALLET({walletBalance : response.data.data.wallet_balance}));
        setWalletResponse({
          status: response.data.status,
          payment_id: response.data.data.payment_id,
        });
        setPaymentStatus(true);
      } catch (errors) {
        console.log(errors);
        setPaymentStatus(false);
      }
    } else if (payment_method === "cash_on_delivery") { // Change to cash_on_delivery
      setPaymentStatus(true);
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const { cartitem = [] } = cartData;
      const modifiedCartItems = [...cartitem].map((i) => {
        return { product: i.id, quantity: i.quantity };
      });
      const cartId = get(cartData, "data.0.id");

      if (!selectedAddress && !newAddress) {
        setLoading(false);
        return toast.error("Address can't be empty !");
      }
      if(mode_of_payment === undefined)
      {
          setLoading(false);
          return toast.error("Please select a mode of payment");
      }

      // Payload for Order creation
      const payload = {
        address: newAddress || selectedAddress,
        order_list: modifiedCartItems,
        mode_of_payment: mode_of_payment,
      };
     
      
      try {
        fetchCartDetails()
        if (cartData.delivery_charge>cartData.default_delivery_charge){
          setModal(true);
          dispatch(actionsCreator.SET_PREVIOUS_DELIVERY_CHARGE({previous_delivery_charge: delivery_charge}))
          dispatch(actionsCreator.SET_DELIVERY_CHARGE({ delivery_charge: cartData? cartData.delivery_charge: delivery_charge }))
          setDebitdata(payload)
          setCartid(cartId)
        }
        else{
          const data = await cartAPI.placeOrder(payload, cartId);
          if(data.status !== 201)
          {
            throw("Order couldn't be created")
          }
          try {
            paymentDebitor(data.data, data.data.mode_of_payment);            
          } catch (error) {
            toast.error("Payment Failed... Try Again");
            setLoading(false);
            
          }
        }
      } catch (error) {
        if (error.response && error.response.data.message){
          toast.error(error.response.data.message);
        }
        else if (error.response.data && error.response.data.out_of_stock){
          setOutOfStock(error.response.data.out_of_stock)
          toast.error("Not enough items in stocks!");
          window.scrollTo(0, 0)
        }
        else{
          toast.error("Something went wrong, we are fixing this issue.");
        }
        setLoading(false)
        console.log('Order not created')
      }
      
      
      // setLoading(false);
    } catch (error) {
      toast.error("Error while creating order");
      setLoading(false);
      
    }
  };
  async function alert_place_order(payload, cartId) {
    setLoading(true)
    try{
      const data = await cartAPI.placeOrder(payload, cartId);
      if(data.status !== 201)
      {
        setLoading(false);
        throw("Order couldn't be created")
      }
      try {
        console.log(data.data)
        setDebit(!debit)   
        paymentDebitor(data.data, data.data.mode_of_payment);         
      } catch (error) {
        toast.error("Payment Failed... Try Again");
        setDebit(!debit)  
      }
    }
    catch (error){
      setLoading(false);
      setDebit(false)    
  }}
  useEffect(() => {
    if (debit) {
      setModeOfPayment(debitdata.mode_of_payment)
      alert_place_order(debitdata, cartid);
    }
  }, [debit]);

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

  useEffect(() => {
    
    if(mode_of_payment === 'razorpay' || mode_of_payment === 'wallet' || mode_of_payment === 'paytm')
    {
      setPlaceOrderBtn('Pay Now')
    }
    else if(mode_of_payment === 'cash_on_delivery')
    {
      setPlaceOrderBtn('Place Order')
    }

  }, [mode_of_payment]);

  const walletFetcher = async () => {
      if(isWallet && cartData &&
        parseFloat(walletBalance) >= parseFloat(cartData.final_price) + delivery_charge)
      {
        setModeOfPayment('wallet')
      }
      else
      {
        setModeOfPayment('cash_on_delivery')
      }
  };

  useEffect(() => {
    walletFetcher();
  }, [isWallet,cartData]);

  return (
    <>
    {isLoggedIn?<Alert />: null}
    <div className="checkout-container">
      <Modal show={showModal}>
        <div className="modal-loader" >
          <div className="modal-button-loader"></div>
          <div className="modal-message">Please Wait, Your transaction is being processed</div>
        </div>
      </Modal>

      <Modal show={modal}>
        <div className="home-page-modal">
          <div
            className="cross"
            onClick={() => {
              setModal(false);
              setLoading(false)
            }}
          >
            ✕
          </div>
          <h5>Night Surcharge - We charge an additional ₹{delivery_charge>default_delivery_charge?delivery_charge-default_delivery_charge:delivery_charge} post {start_time}. This goes towards paying delivery superstars fairly.
          <br />
          <br />
          <center>
            <Button
              className="checkout-button"
              text="Proceed to pay."
              clicker={() => {
                setDebit(true)
                setModal(false)
              }}
              width={"50%"}
            />
          </center>
          
          </h5>
        </div>
      </Modal>

      {cartitem && cartitem.length > 0 ? (
        <>
          <div className="checkout-wrapper">
            <CheckoutBill
              cartData={cartData}
              removeItem={removeItem}
              isLoggedIn={isLoggedIn}
              showOptions={true}
              walletBalance={isWallet ? walletBalance:null}
              setModeOfPayment={setModeOfPayment}
              mode_of_payment={mode_of_payment}
            />
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
              text={isLoggedIn ? mode_of_payment !== undefined? placeOrderBtn:'Place Order' : "Checkout"}
              clicker={() => {
                //testFunction();
                // checkoutHandler();
                placeOrder();
              }}
              width={"100%"}
            />
          </div>
        </>
      ) : (
        <EmptyData
          text={
            "There are no items in your cart. Please add some items in your cart"
          }
        />
      )}
    </div>
    </>
  );
}