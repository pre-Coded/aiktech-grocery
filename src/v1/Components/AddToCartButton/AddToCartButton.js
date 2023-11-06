import React from 'react';
import { cartAPI } from '../../Api';
import { actionsCreator } from '../../Redux/actions/actionsCreator';
import { modifyCartData, errorMsg } from '../../Utils';
import './AddToCartButton.scss';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { extractFinalPrice, fetchQuantity } from '../../Utils';
import { toast } from 'react-toastify'
const mapStateToProps = ({
    cart,
    auth
}) => ({
    cart,
    auth
});

export default function AddToCartButton({ product }) {
    const {
        cart,
        auth
    } = useSelector(mapStateToProps);
    const { id } = product;
    const { isLoggedIn = false } = auth;
    const cartitem = get(cart, 'cartitem', []);
    const dispatch = useDispatch();
    const changeQuantity = (param) => {
        if (!isLoggedIn) {
            let modifiedCartItems = modifyCartData(cartitem, product, param)
            let { final_price = 0, final_item = 0 } = extractFinalPrice(modifiedCartItems);
            dispatch(actionsCreator.SET_CART_DATA({ cartitem: modifiedCartItems, final_price, final_item }));
            let message = param === "decrement" ? "Item is removed successfully." : "Item added successfully."
            toast.success(message, {
                toastId: 'success1',
            })

        }
        else {
            let quantityCheck = Math.floor(product.quantity_remaining)
            let { final_item = 0 } = cart;
            // call cart api
            let newQuantity
            if (param === 'decrement') {
                newQuantity = quantity - 1
                updateCart(newQuantity, param);
            }
            else {
                if (quantity >= 10 || final_item >= 20) {
                    toast.error(`Can't add more than ${quantity >= 10 ? "10" : "20"} items`, {
                        toastId: 'stockError',
                    })
                }
                else if (quantity < quantityCheck) {
                    newQuantity = quantity + 1
                    updateCart(newQuantity, param);
                }
                else {
                    toast.error("Not enough items in stock", {
                        toastId: 'stockError',
                    })
                }
            }
        }
    }
    const updateCart = async (newQuantity, param) => {
        try {
            let modifiedCartItems = [...cartitem].map(i => {
                return { product: i.id, quantity: i.quantity }
            });
            let modifiedItemIndex = modifiedCartItems.findIndex(item => {
                return item.product === id
            });
            if (modifiedItemIndex >= 0) {
                modifiedCartItems[modifiedItemIndex] = {
                    product: id,
                    quantity: newQuantity
                }
            }
            else {
                modifiedCartItems.push({
                    quantity: newQuantity,
                    product: id
                })
            }
            const payload = {
                items: modifiedCartItems
            }
            const res = await cartAPI.addCartItems(payload);
            let message = param === "decrement" ? "Item is removed successfully." : "Item added successfully."
            toast.success(message, {
                toastId: 'success1',
            })
            dispatch(actionsCreator.SET_PREVIOUS_DELIVERY_CHARGE({previous_delivery_charge: cart.delivery_charge}))
            dispatch(actionsCreator.FETCH_CART_DETAILS());
        } catch (error) {

            const msg = errorMsg(error);
            toast.error(msg)
        }
    }
    const quantity = fetchQuantity(id, cartitem)
    return (
        <>
            {
                quantity && quantity > 0 ?
                    <div className='added-to-cart'>
                        <button onClick={() => changeQuantity('decrement')}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => changeQuantity()}>+</button>
                    </div>
                    :
                    <button className='added-to-cart' onClick={() => { changeQuantity() }}>
                        <p>
                            Add To Cart
                        </p>
                    </button>

            }
        </>

    )
}
