import React, { useEffect, useRef, useState } from "react";
import "./CountDown.scss";
import orderPlacedImg from "../../Assets/Images/Group6971.png";
import { dateExtractor } from "../../Utils";

const CountDown = (props) => {
  const [minutes, setminutes] = useState("00");
  const [seconds, setseconds] = useState("00");
  let interval = useRef();
  const [orderTime, setorderTime] = useState();
  const [message, setmessage] = useState("timer");
  useEffect(() => {
    if (props.checkoutTime) {
      let time = dateExtractor(props.checkoutTime);
      setorderTime(time);
    }
  }, [props.checkoutTime, props.delivered]);

  useEffect(() => {
    if (props.delivered === true) {
      setmessage("Order Delivered");
    }
  }, [props.delivered]);

  const startCountDown = () => {
    var currentDate = new Date(orderTime);
    var minutesToAdd = 10;
    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const CountdownDate = futureDate;
    //first call is immediate
    const now = new Date().getTime();
    const distance = CountdownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (props.isExpress === false && props.delivered === false) {
      // setmessage("You order will be delivered soon!");
      setmessage("Your order has been placed");
    }

    if (distance < 0) {
      //stop!!
      if (props.delivered === true) setmessage("Order Delivered");
      // else setmessage("Umm.. Your order is running a bit late, we're on it!");
      else setmessage("Order Placed");
      clearInterval(interval.current);
    } else {
      setminutes(minutes);
      setseconds(seconds);
    }

    //subsequent calls are within interval
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = CountdownDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop!!
        clearInterval(interval.current);
      } else {
        setminutes(minutes);
        setseconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    if (orderTime) {
      startCountDown();
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [orderTime]);
  return (
    <section className="CountDown-container">
      <section className="CountDown">
        <div>
          <img src={orderPlacedImg} />
          <p className="thankyou-text">
            Thank you for placing the order.
            {message === "timer"
              ? "Your items will be delivered in a jiffy."
              : null}
          </p>
        </div>
        {message === "timer" ? (
          <div className="clock">
            <section>
              <p>{minutes}</p>
              <p>
                <small>Minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{seconds}</p>
              <p>
                <small>Seconds</small>
              </p>
            </section>
          </div>
        ) : (
          <h3
            className={
              message === "Order Delivered"
                ? "delivery-message delivered-message"
                : "delivery-message"
            }
          >
            {message}
          </h3>
        )}
      </section>
      <p>Placed at {dateExtractor(props.checkoutTime, "24h")} </p>
      <br />
    </section>
  );
};

export default CountDown;

// CountDown.defaultProps = {
//   checkoutTime: new Date("12 12 2021 00:02:00").getTime(),
// };
