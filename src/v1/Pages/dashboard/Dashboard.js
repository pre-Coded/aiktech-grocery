import React, { useEffect, useRef, useState } from "react";
import requestMaker from "../../Lib/NetworkHandler";
import sound from './Message notification.mp3'
import axios from "axios";
import Loader from "../../Components/Loader";
import CardOrders from "../../Components/cardOrders/CardOrders";
import './Dashboard.scss';
import { IoMdNotificationsOff,IoIosNotifications } from 'react-icons/io'
import { toast } from "react-toastify";

const Dashboard=()=>{
    const [orders,setOrders]=useState([]);
    const [notifications,setNotifications]=useState(false)
    const [loading,setLoading]=useState(true);
    const [load,setLoad]=useState(false);
    const [display,setDisplay]=useState([]);
    const [firstRender,setFirstRender]=useState(true);
   
    
    const notificationHandler=()=>{
        if(notifications){
            toast.warn("Turned off notifications",{autoClose: 1000})
        }
        else{
            toast.success("Turned on notifications",{autoClose: 1000})
        }
        setNotifications(!notifications)
    }

    const fetchorders=()=>{
        try{
        const params={}
        const payload={}
        const promise=requestMaker("/shop/fetch_all_orders/","get",params,payload);
        promise.then((response)=>{
            setOrders(response.data);
            if(orders.length!==0 && notifications===true){
            if(response.data[0].id!==orders[0].id){
                new Audio(sound).play()
            }
            }
            setDisplay(orders.slice(0,20))
            
        }
            )
        }
        catch(err){
            console.error(err.message);

        }
    }
    useEffect(()=>{
            
        setFirstRender(false)
        fetchorders();

        const intervalId=setInterval(()=>{
            setLoad(!load);
            
        },1000)
        setLoading(false);
        return () => clearInterval(intervalId);
        },[load])

    return(
        <div className="dashboard" >

            {
                loading===true?(<Loader/>):(
                    <div>
                         <div className="dashboard-heading-wrapper">
                         <h4 className="dashboard-heading">Table Orders Dashboard</h4>
                         <button onClick={notificationHandler} 
                         className="dashboard-notification-button"
                         style={{backgroundColor :"rgb(126,145,243)",color:"black"}}
                         >
                            {
                            (notifications===true)?
                            (<IoIosNotifications fontSize={30}/>):
                            (<IoMdNotificationsOff fontSize={30}/>)
                            
                            }

                         </button>

                         </div>
                        <div className="cards-dashboard-wrapper"> 
                        {
                            orders.length===0 && firstRender===false?(
                                <div className="cards-dashboard-noOrders">
                                    <h4>No orders to display</h4>
                                </div>
                            ):(
                                <div className="cards-dashboard">

                            {
                                display.length!==0?
                                display.map((order,index)=>{
                                    return (
                                        <CardOrders  order={order}  key={index} />
                                    )          
                                }
                                ):(<Loader/>)
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