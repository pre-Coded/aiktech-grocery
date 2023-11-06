import React, { useState, useEffect } from "react";
import "./Subtotal.scss";
import { useSelector } from "react-redux";

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default function Subtotal({
  final_price = 0,
  final_item = 0,
  discount_code = "",
  prev_total,
  deliveryCharge,
  total_final_cost,
  paymentmode
}) {
  const {
    cart: cartData,
  } = useSelector(mapStateToProps);
  const { delivery_charge, default_delivery_charge} = cartData
  return (
    <div className="checkout-subtotal-wrapper">
      {discount_code ? (
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Discount Coupon</div>
          <div className="checkout-subtotal-price discount-applied">
            {discount_code}
          </div>
        </div>
      ) : null}
      {paymentmode?
         <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Payment Mode</div>
          <div className="checkout-subtotal-price discount-applied">
            {paymentmode}
          </div>
        </div>
        :null
      }
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Subtotal</div>
        <div className="checkout-subtotal-price ">
          {/* {parseFloat(final_price) - parseFloat(deliveryCharge) ===
          parseFloat(final_price) ? null : (
            <span className="strike-subtotal">
              <span className="ruppe">₹</span>
              {parseFloat(final_price)}
            </span>
          )}{" "} */}
          {<span className="ruppe">₹</span>}
          {total_final_cost? (parseFloat(total_final_cost)!==0? parseFloat(total_final_cost)-parseFloat(deliveryCharge): "pending"): (parseFloat(final_price)!==0? parseFloat(final_price): "pending")}
          
        </div>
      </div>
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Total Items</div>
        <div className="checkout-subtotal-price">{final_item}</div>
      </div>
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Delivery Charge</div>
        <div className="checkout-subtotal-price">
          <span className="ruppe">₹</span> {parseFloat(deliveryCharge)? parseFloat(deliveryCharge)>default_delivery_charge? default_delivery_charge: parseFloat(deliveryCharge): default_delivery_charge}
        </div>
      </div>
      {!deliveryCharge && delivery_charge>default_delivery_charge?
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Night Surcharge</div>
          <div className="checkout-subtotal-price">
            <span className="ruppe">₹</span> {delivery_charge-default_delivery_charge}
          </div>
        </div>
      : null}
      {deliveryCharge && deliveryCharge>default_delivery_charge?
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Night Surcharge</div>
          <div className="checkout-subtotal-price">
            <span className="ruppe">₹</span> {deliveryCharge-default_delivery_charge}
          </div>
        </div>
      : null}
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Total Price</div>
        <div className="checkout-subtotal-price">
        <span className="ruppe">₹</span> {total_final_cost? (parseFloat(total_final_cost)!==0? parseFloat(total_final_cost) : "pending"): (parseFloat(final_price)!==0? parseFloat(final_price)+ (parseFloat(deliveryCharge)? parseFloat(deliveryCharge): delivery_charge): "pending")}
        </div>
      </div>
    </div>
  );
}
