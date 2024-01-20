import React from "react";
import "./CheckoutBill.scss";
import { CheckoutProduct, Button, Dropdown, Modal } from "../../../Components/";
import { sortItems } from "../../../Utils";
import Subtotal from "../../Subtotal";
import Discount from "../Discount/Discount";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "../CheckoutAddress/CheckoutAddress.scss";

export default function CheckoutBill({
  cartData = {},
  removeItem,
  isLoggedIn,
  mode_of_payment,
  setModeOfPayment,
  walletBalance,
  // setIsWallet,
  showOptions,
}) {
  const { cartitem = [], operational, delivery_charge, default_delivery_charge, previous_delivery_charge, final_item, start_time, unoperational_message, out_of_stock } = cartData;
  const formattedCartItems = sortItems(cartitem);
  const [sum, setsum] = useState(1);
  const [modal, setModal] = useState(false);
  const [showoperational, setShowoperational] = useState(!operational)

  useEffect(() => {
    setModal(delivery_charge>previous_delivery_charge)
  }, [final_item])
  
  useEffect(() => {
    setShowoperational(!operational)
}, [operational])
  
  // console.log(delivery_charge, previous_delivery_charge, modal)
  const subtotal = (cartData) => {
    const { final_price = 0, final_item, discount_code } = cartData;
    return (
      <Subtotal
        prev_total={sum}
        final_item={final_item}
        final_price={final_price}
        discount_code={discount_code}
      />
    );
  };

  useEffect(() => {
    // console.log({ wallet: wallet });
    const temp = document.querySelector("#showwallet");
    if (walletBalance === null) {
      temp.style.display = "none";
    } else {
      temp.style.display = "flex";
    }
  }, [walletBalance]);

  useEffect(() => {
    let temp = 0;
    let i;
    let item;
    if (formattedCartItems !== null)
      for (i = 0; i < formattedCartItems.length; i++) {
        item = formattedCartItems[i];
        temp = temp + item.original_price * item.quantity;
        item.out_of_stock = false
        for (let j=0; j < out_of_stock.length; j++){
          if (item.id==out_of_stock[j]){
            item.out_of_stock = true
          }
        }
      }
    setsum(temp);
  }, [formattedCartItems, out_of_stock]);

  const options = [
    {
      name: "Cash On Delivery",
      value: "ECOD",
    },
    {
      name: "Online Payment",
      value: "online",
    },
  ];
  return (
    <div className="checkout-product-wrapper">
      <Modal show={modal}>
        <div className="home-page-modal">
          <div
            className="cross"
            onClick={() => {
              setModal(false);
            }}
          >
            ✕
          </div>
          <h5>Night Surcharge - We charge an additional ₹{delivery_charge>default_delivery_charge?delivery_charge-default_delivery_charge:delivery_charge} post {start_time}. This goes towards paying delivery superstars fairly.</h5>
        </div>
      </Modal>
      <Modal show={showoperational}>
        <div className="home-page-modal">
          {/* <div
            className="cross"
            onClick={() => {
              setShowoperational(false);
            }}
          >
            ✕
          </div> */}
          <h5>{unoperational_message}</h5>
        </div>
      </Modal>
      <h5>PRODUCT</h5>
      {formattedCartItems.map((i, index) => {
        // console.log(i)
        return (
          <CheckoutProduct
            product={i.product_name}
            photo={i.photo}
            price={i.original_price}
            description={i.description}
            final_price={i.final_price}
            quantity={i.quantity}
            key={index}
            removeItem={() => removeItem(i)}
            id={i.id}
            quantity_remaining={i.quantity_remaining}
            showStrikeThrough={true}
            out_of_stock = {i.out_of_stock}
          />
        );
      })}
      {isLoggedIn && <Discount cartData={cartData} />}
      {subtotal(cartData)}

      {showOptions && (
        <>
          <button
            id="showwallet"
            onClick={() => {
              if (
                walletBalance &&
                cartData &&
                parseFloat(walletBalance) >=
                  parseFloat(cartData.final_price) + 10
              ) {
                // setIsWallet(true);
                setModeOfPayment("wallet");
                toast.success("Wallet Selected");
              } else {
                toast.error("Insufficient balance");
              }
            }}
            className={
              walletBalance &&
              cartData &&
              parseFloat(walletBalance) >=
                parseFloat(cartData.final_price) + 10
                ? mode_of_payment === "wallet"
                  ? "wallet-btn wallet-selected"
                  : "wallet-btn"
                : "wallet-btn"
            }
          >
            <div className="selectWrap">
              <div
                className={
                  mode_of_payment === "wallet"
                    ? "circle circle-selected"
                    : "circle"
                }
              ></div>
              Pay with Wallet
            </div>
            <div>
              <span className="ruppe">₹</span>
              {walletBalance && parseFloat(walletBalance)}
            </div>
          </button>
          <button
            onClick={() => {
              // setIsWallet(false);
              setModeOfPayment("cash_on_delivery");
              toast.success("Pay on Delivery selected");
            }}
            className={
              mode_of_payment === "cash_on_delivery"
                ? "wallet-btn wallet-selected"
                : "wallet-btn"
            }
          >
            <div className="selectWrap">
              <div
                className={
                  mode_of_payment === "cash_on_delivery"
                    ? "circle circle-selected"
                    : "circle"
                }
              ></div>
              Pay on Delivery
            </div>
          </button>
          {/* <button
            onClick={() => {
              // setIsWallet(false);
              setModeOfPayment("online");
              toast.success("Online Payment Selected");
            }}
            className={
              mode_of_payment === "online"
                ? "wallet-btn wallet-selected"
                : "wallet-btn"
            }
          >
            <div className="selectWrap">
              <div
                className={
                  mode_of_payment === "online"
                    ? "circle circle-selected"
                    : "circle"
                }
              ></div>
              Online Payment
            </div>
          </button> */}
          {" "}
        </>
      )}
    </div>
  );
}
