import React, { useContext, useEffect, useState } from "react"
import {BiSolidEdit} from 'react-icons/bi'
import {SiMicrosoft} from 'react-icons/si'
import './CardOrders.scss'
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import requestMaker from "../../Lib";

const CardOrders=({order})=>{
    
    
    
    
    
    
    const formatTime=(time)=>{
        const timestamp = new Date(time);
        const formattedDate = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear() % 100},`;
        const period = timestamp.getHours() >= 12 ? "PM" : "AM"
        const hours=(timestamp.getHours()) % 12
        const formattedTime=`${hours}:${timestamp.getMinutes()} ${period}`
        return `${formattedDate} ${formattedTime}`


    }
    const orderItemsDisplay=()=>{
       
        
       
            console.log(typeof order.id);
            const id=parseInt(order.id)
            const params={}
            const payload={}
            const response=requestMaker(`/shop/${id}/order/set_viewed/`,"get",params,payload) 
            response.then((response)=>{
                console.log(response);
            }).catch((err)=>{
                console.error(err.message)
            })

    }
    
  
    return (
        <div>
        <div className="cardorder">
            <div className="cardorder-heading" style={(order.is_viewed)?{"backgroundColor":"blue"}:{"backgroundColor":"red"}}>{order.status}</div>
            <div className="cardorder-quantity">1</div>
            <div className="cardorder-price">Total:€ {parseFloat(order.total_price).toFixed(2)}</div>
            <div className="cardorder-date">Created at : {formatTime(order.created_on)}</div>
            <div>
                <div className="cardorder-tags">
                <div className="cardorder-tag">tag1</div>
                <div className="cardorder-tag">tag2</div>
                
                


                </div>
            </div>
            <div className="cardorder-button-wrapper">
                
            <button 
            className="cardorder-open-button"
            onClick={orderItemsDisplay}       
             >open</button>
             
             

            </div>
            
            <div className="cardorder-icons">
            <BiSolidEdit/>
            <SiMicrosoft/>
            </div>
            
        </div>
        </div>

    )
}

export default CardOrders;