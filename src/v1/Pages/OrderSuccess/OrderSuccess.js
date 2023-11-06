import React, { useEffect, useState } from "react";
import orderSuccessImg from "../../Assets/Images/order-success.png";
import { Modal } from "../../Components";
import { activeOrders } from "../../Api/cartAPI";
import gift from '../../Assets/Images/gifs/gift.gif';
import "./OrderSuccess.scss"
import { useHistory } from "react-router";

export default function OrderSuccess() {
    const [seconds, setSeconds] = useState(3);
    const [modal, setModal] = useState(true);
    const [promotionalDiscountCode, setPromotionalDiscountCode] = useState(null);
    const history = useHistory()
    const fetchOrders = async () => {
        try {
            let response = await activeOrders();
            setPromotionalDiscountCode(response.data.promotional_discount);
        } catch { setModal(false); }
    };
    useEffect(() => {
        if (!modal) {
            if (seconds > 0 && !modal) {
                setTimeout(() => setSeconds(seconds - 1), 1000);
            } else {
                setSeconds(0);
                // window.location.href = "myorders";
                history.replace('/myorders')
            }
        }
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (
            promotionalDiscountCode?.code && promotionalDiscountCode?.value)
            setModal(true)
        else
            setModal(false)
    }, [promotionalDiscountCode?.code, promotionalDiscountCode?.value])

    return (
        <div className="Order__Success__Container">
            {promotionalDiscountCode?.code && promotionalDiscountCode?.value ? (
                <Modal show={modal} onClose={() => setModal(false)}>
                    <div className="discount_modal">
                        <div className="cross" onClick={() => setModal(false)}>
                            ✕
                        </div>
                        <img src={gift} alt="" />
                        {promotionalDiscountCode.discount_code_type === "A" ? (
                            <div>
                                <div>
                                    Thanks For Purchasing! Use code{" "}
                                    <span className={"highlight-message"}>
                                        {promotionalDiscountCode.code}
                                    </span>
                                </div>
                                <div>
                                    and get flat <span className="ruppe">₹</span>{promotionalDiscountCode.value} off on minimum
                                    order value of <span className="ruppe">₹</span>{promotionalDiscountCode.minimum_order_value} on your next order !!
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    Thanks For Purchasing, Use code{" "}
                                    <span className={"highlight-message"}>
                                        {promotionalDiscountCode.code}
                                    </span>
                                </div>
                                <div>
                                    and get {promotionalDiscountCode.value} % off upto{" "}
                                    <span className="ruppe">₹</span>{promotionalDiscountCode.maximum_discount} for minimum order
                                    value of <span className="ruppe">₹</span>{promotionalDiscountCode.minimum_order_value} on
                                    your next order !!
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            ) : () => setModal(false)}
            <img className="Order__Success__Image" src={orderSuccessImg} />
            <div className="Order__Success__Message">
                Thank you for placing the order. Your items will be delivered in a
                jiffy.
            </div>
            {seconds && !modal ? (
                <p className="Redirecting"> Redirecting in {seconds} seconds</p>
            ) : (
                <p className="Redirecting"> Redirecting...</p>
            )}
        </div>
    );
}
