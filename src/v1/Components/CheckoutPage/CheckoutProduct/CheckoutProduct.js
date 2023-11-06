import React from "react";
import close from "./close.svg";
import "./CheckoutProduct.scss";
import AddToCartButton from "../../AddToCartButton";
import Tooltip from "../../ProductCard/Tooltip";

export default function CheckoutProduct({
    photo,
    product,
    description,
    quantity,
    price,
    final_price,
    removeItem,
    id,
    readyOnly,
    quantity_remaining,
    showStrikeThrough,
    discount,
    out_of_stock
}) {
    if (quantity_remaining<quantity){
        out_of_stock=true
    }
    else if(quantity==quantity_remaining){
        out_of_stock=false
    }
    return (
        <div className="checkout-product">
            <div className={`img-div ${out_of_stock? "fade-card": ''}`}>
                <img src={photo} alt="" />
            </div>
            <div className="checkout-details">
                <div className={`checkout-product-details`}>
                    <div className={`${out_of_stock? "fade-card": ''}`}>
                        <div className="checkout-product-name">
                            {product} <span className="checkout-product-quantity">x{parseInt(quantity)}</span>
                            <span className="product-price">
                                <div>
                                    <span className="ruppe">₹</span> {parseFloat(price)!==0? parseFloat(price): "pending"}
                                </div>
                            </span>
                        </div>
                        <div className="checkout-product-description">{description}</div>
                        {quantity>quantity_remaining && quantity_remaining==0 && out_of_stock? <p className="out-of-stock">Out Of Stock</p> : null}
                        {quantity>quantity_remaining>=1 && quantity_remaining!=0 && out_of_stock? <p className="out-of-stock">Only {quantity_remaining} item left!</p>: null}
                    
                    </div>
                    
                    {!readyOnly && (
                        <AddToCartButton
                            product={{
                                title: product,
                                price,
                                quantity,
                                description,
                                image: photo,
                                id,
                                quantity_remaining,
                            }}
                        />
                    )}
                </div>
                <div className="checkout-product-delete">
                    {!readyOnly && (
                        <div onClick={() => removeItem()}>
                            <img src={close} alt="" />
                        </div>
                    )}

                    {/* {showStrikeThrough === true ?
                        <span className="product-price">
                            {parseFloat(price) * quantity !== parseFloat(final_price)
                                ?
                                <div className="strikeThrough">
                                    <span className="ruppe">₹</span>
                                    {parseFloat(price) * quantity}
                                </div>
                                : null
                            }
                        </span>
                        : null
                    } */}
                    <span className="product-price">
                        <span className="ruppe">₹</span>
                        {!parseFloat(final_price)? "pending": parseFloat(price) * quantity}
                    </span>
                </div>
            </div>
        </div>
    );
}
