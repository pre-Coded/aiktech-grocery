import React, { useEffect, useRef, useState } from "react";
import './Dashboard.scss';
import '../../../index.scss'
import requestMaker from "../../Lib/NetworkHandler";
import sound from './Message notification.mp3'
import axios from "axios";
import Loader from "../../Components/Loader";
import CardOrders from "../../Components/cardOrders/CardOrders";
import { IoMdNotificationsOff, IoIosNotifications } from 'react-icons/io'
import { toast } from "react-toastify";


const Dashboard = () => {

    const [orders, setOrders] = useState([]);
    const [notifications, setNotifications] = useState(false)
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(false);
    const [display, setDisplay] = useState([]);
    const [firstRender, setFirstRender] = useState(true);


    const notificationHandler = () => {
        if (notifications) {
            toast.warn("Turned off notifications", { autoClose: 1000 })
        }
        else {
            toast.success("Turned on notifications", { autoClose: 1000 })
        }
        setNotifications(!notifications)
    }

    const fetchorders = () => {
        try {
            const params = {}
            const payload = {}
            const promise = requestMaker("/shop/tenant/orders/", "get", params, payload);
            promise.then((response) => {
                setOrders(response.data);
                if (orders.length !== 0 && notifications === true) {
                    if (response.data[0].id !== orders[0].id) {
                        new Audio(sound).play()
                    }
                }
                setDisplay(orders.slice(0, 20))
            }
            )
        }
        catch (err) {
            console.error(err.message);

        }
    }

    useEffect(() => {

        setFirstRender(false)
        fetchorders();

        const intervalId = setInterval(() => {
            setLoad(!load);
        }, 1000)

        setLoading(false);
        return () => clearInterval(intervalId);
    }, [load])

    return (
        <div className="dashboard-container flex-row flex-1" >

            {
                loading === true ? 
                (
                    <div className="flex-1 flex-row place-item-center">
                         <Loader />
                    </div>
                ) 
                : 
                (
                    <div className="dashboard-content flex-column">

                        <div className="dashboard-heading-wrapper flex-row">

                            <span className="dashboard-heading flex-row items-center">Table Orders Dashboard</span>

                            <button 
                                onClick={notificationHandler}
                                className="dashboard-notification-button btn-none"
                            >

                                {
                                    (notifications === true) ?
                                        (<IoIosNotifications fontSize={30} color="green" />) :
                                        (<IoMdNotificationsOff fontSize={30} color="red" />)

                                }

                            </button>
                        </div>

                        <div className="flex-1 flex-row place-item-center" style={{marginTop : '1rem'}}>
                            {
                                orders.length === 0 && firstRender === false ? 
                                (
                                    <span>No orders to display</span>
                                ) 
                                : 
                                (
                                    <div className="cards-dashboard flex-1 overflow-scroll">
                                        {
                                            display.length !== 0 ?
                                                display.map((order, index) => {
                                                    return (
                                                        <CardOrders order={order} key={index} />
                                                    )
                                                }
                                                ) 
                                                : 
                                                ( 
                                                <div className="flex-1 flex-row place-item-center border-red">
                                                    <Loader />
                                                </div> 
                                                )
                                        }
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )
            }

        </div>

    )
}

export default Dashboard;