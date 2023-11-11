import React, { useState, useEffect } from "react";
import {
  CheckoutProduct,
  CountDown,
  EmptyData,
  Subtotal,
} from "../../Components";
import "./ActiveOrders.scss";
import { activeOrders } from "../../Api/cartAPI";
import { set } from "lodash";
import deliveryIcon from "../../Assets/Images/delivery/delivery1.jpg";
import { dateExtractor, getToken, polling } from "../../Utils";
import { useHistory } from "react-router-dom";
import defaultImage from "../../Assets/Images/default-image.png";
import { useDispatch } from "react-redux";
import { actionsCreator } from "../../Redux/actions/actionsCreator";

const ActiveOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState(null);
  const [items, setItems] = useState(null);
  const [checkoutTime, setCheckoutTime] = useState("");
  const [total, settotal] = useState(0);
  const [costs, setCosts] = useState(null);
  const [quantity, setquantity] = useState(0);
  const [delivered, setdelivered] = useState(true);
  const [deliveryCharge, setDeliveryCharge] = useState(10)
  const [orderType, setisExpress] = useState("");
  const [promotionalDiscountCode, setPromotionalDiscountCode] = useState("");
  const [discount, setDiscount] = useState("")
  const [paymentmode, setpaymentMode] = useState("")
  const history = useHistory();
  const [page, setPage] = useState(1)
  const [totalpage, setTotalpage] = useState(0)
  const dispatch = useDispatch();
  const fetchOrders = async () => {
    try {
      let response = await activeOrders(page);
      setOrders(orders.concat(response.data.data));
      setPromotionalDiscountCode(response.data.promotional_discount);
      setTotalpage(response.data.total_pages)
    } catch { }
  };

  const fetchCartDetails = async () => {
    dispatch(actionsCreator.FETCH_CART_DETAILS());
  };
  
  useEffect(() => {
    let token = getToken();
    if (!token) {
      history.push("/");
    } else {
      fetchCartDetails()
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setOrderID(orders[0].id);
      setItems(orders[0].items);
      setCheckoutTime(orders[0].created_on);
      setdelivered(orders[0].delivered);
      setDeliveryCharge(orders[0].delivery_charge)
      setisExpress(orders[0].delivery_type);
      setCosts(orders[0].total_price);
      setpaymentMode(orders[0].mode_of_payment)
    }
  }, [orders]);

  useEffect(() => {
    let sum = 0;
    let totalQuantity = 0;
    if (items) {
      items.map((item) => {
        sum += parseFloat(item.final_price);
        totalQuantity += parseInt(item.quantity);
      });
      settotal(sum.toFixed(2));
      setquantity(totalQuantity);
    }
    setDiscount(items && items.length>0? items[0].discount_code? items[0].discount_code.code: "": "")
  }, [items]);
  // let interval;
  // useEffect(() => {
  //   interval = polling(fetchOrders, 10000);
  //   if (delivered) clearInterval(interval);
  // }, [delivered]);

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     fetchOrders();
  //   }, 10000);
  //   if (delivered) {
  //     clearInterval(interval);
  //   }
  // }, [delivered]);

  useEffect(() => { }, [orders]);
  useEffect(() => { 
    fetchOrders()
  }, [page]);
  const handlepreviousOrder = ()=>{
    if (page<totalpage){
      setPage(page+1)
    }
  }
  return (
    <div className="active-order-wrapper">
      {orders && orders.length > 0 ? (
        <>
          <div className="active-orders">
            <h3>Order Details </h3>
            <p>Order ID: #{orderID}</p>
            {promotionalDiscountCode?.code && promotionalDiscountCode?.value && (
              <div className={"discount-card-active-orders"}>
                <React.Fragment>
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
                </React.Fragment>
              </div>
            )}
            <div className="active-order-container">
              {orders && orders.length > 1 && (
                <div className="active-order-card-container">
                  {orders.map((item, index) => {
                    return (
                      <div
                        className={
                          item.id === orderID
                            ? "active-order-card highlight-order"
                            : "active-order-card"
                        }
                        onClick={() => {
                          setOrderID(item.id);
                          setItems(item.items);
                          setCheckoutTime(item.created_on);
                          setdelivered(item.delivered);
                          setisExpress(item.delivery_type);
                          setCosts(item.total_price);
                          setDeliveryCharge(item.delivery_charge)
                          setpaymentMode(item.mode_of_payment)
                          console.log(item, item.mode_of_payment)

                        }}
                      >
                        <img src={deliveryIcon} alt="deliveryicon" />
                        <p>Order ID: {item.id}</p>
                        <p>
                          Placed at: {dateExtractor(item.created_on, "24h")}
                        </p>
                      </div>
                    );
                  })}
                  {totalpage!==page?
                    <center>
                      <button
                        onClick={handlepreviousOrder}
                        className="btn load-more"
                      >
                        Load More
                      </button>
                    </center>:null
                  }
                  
                  
                  <div className="spacer">
                    {" "}
                  </div>
                </div>
              )}
              <div className="active-order-details">
                {items
                  ? items.map((item, index) => {
                    return (
                      <CheckoutProduct
                        product={item.title}
                        photo={item.photo ? item.photo : defaultImage}
                        price={item.price / item.quantity}
                        final_price={item.final_price}
                        description={item.description}
                        quantity={item.quantity}
                        key={index}
                        removeItem={() => { }}
                        id={item.id}
                        readyOnly={true}
                        showStrikeThrough={true}
                        discount={item.discount_code.code}
                      />
                    );
                  })
                  : null}
                <div className="active-order-total">
                  <Subtotal final_price={total} final_item={quantity} deliveryCharge={deliveryCharge} total_final_cost={costs} discount_code={discount} paymentmode={paymentmode} />
                </div>
                <div className="spacer">
                  {" "}
                </div>
              </div>
            </div>
          </div>
          <div className="active-timer" key={checkoutTime}>
            <CountDown
              orderID={orderID}
              checkoutTime={checkoutTime}
              delivered={delivered}
              key={delivered}
              isExpress={false}
            />
          </div>
        </>
      ) : (
        <EmptyData text={"No Order Found"} />
      )}
    </div>
  );
};

export default ActiveOrders;
