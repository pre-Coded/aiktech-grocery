import React, { useContext, useEffect, useState } from "react"
import './CardOrders.scss'
import { useHistory } from "react-router-dom";
import { getBaseUrl } from "../../Lib/NetworkHandler";
import axios from "axios";

import { FiEye } from "react-icons/fi";


const CardOrders = ({ order }) => {
    const history = useHistory();

    const formatTime = (time) => {
        const timestamp = new Date(time);
        const formattedDate = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear() % 100},`;
        const period = timestamp.getHours() >= 12 ? "PM" : "AM"
        const hours = (timestamp.getHours()) % 12
        const formattedTime = `${hours}:${timestamp.getMinutes()} ${period}`
        return `${formattedDate} ${formattedTime}`
    }
    const orderItemsDisplay = () => {
        console.log("localstorage");
        console.log(localStorage);
        const config = {
            params: {
                "id": order.id
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
        localStorage.setItem(`${order.id}`, "1");
        axios.get(`${getBaseUrl()}/api/shop/order/items/`, config)
            .then((response) => {
                console.log(response.data.message);
                const data = response.data.message;
                history.push({ pathname: '/orderItems', state: data })
            }).catch((err) => {
                console.error(err.message)
            })
    }


    return (
        <div className="cardorder">
            <div
                className="text-large text-bold-md cardorder-heading flex-row items-center justify-between"

                style={
                    (localStorage.getItem(`${order.id}`) === "1") ?
                        { color: 'rgb(248,222,197)' } :
                        {
                            color: "rgb(215,234,215)",
                        }}>
                <span>{order.status}</span>

                <button className="btn-none" onClick={orderItemsDisplay}>
                    <FiEye fontSize={'1.2rem'} width={'2rem'} color={"white"}/>
                </button>
            </div>

            <ul className="ul-style-none flex-column gap-10 text-small font-bold-sm" style={{padding : '10px 10px'}}>

                <li className=""> <span className="text-bold-md"> Order Id : </span>{order.id}</li>
                <li className=""><span className="text-bold-md"> Total Price: </span> {parseFloat(order.total_price).toFixed(2)}</li> 
                <li className=""><span className="text-bold-md"> Created At : </span>{formatTime(order.created_on)}</li>

                <li className="">
                    <span className="text-bold-md"> Customer Name : </span>{order.customer.name}
                </li>

                <li className="">
                    <span className="text-bold-md"> Contact Number : </span>{order.customer.phone_number}
                </li>

                <li className="" style={{whiteSpace : 'normal'}}>
                    <span className="text-bold-md"> Address : </span> aldjfal jlka jflka lkfa jlkfja lkdfj alkdsjfal kdjflka jflka f
                </li>
            </ul>
        </div>
    )
}

export default CardOrders;
