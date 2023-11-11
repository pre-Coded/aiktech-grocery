import React, { useEffect, useState } from "react";
import requestMaker from "../../Lib/NetworkHandler";
import sound from './Message notification.mp3'
import axios from "axios";
import { Navbar } from "../../Components";
import Loader from "../../Components/Loader";
import CardOrders from "../../Components/cardOrders/CardOrders";
import { dashboardAPI } from "../../Api";
import './Dashboard.scss'

const Dashboard=()=>{
   

    const [orders,setOrders]=useState([]);
    const [display,SetDisplay]=useState([])
    const [number_of_orders,setNoOfOrders]=useState(0);
    const [loading,setLoading]=useState(true);
    const [load,setLoad]=useState(false);
    
    const fetchorders=()=>{

   
        try{
        const params={}
        const payload={}
        const promise=requestMaker("/shop/fetch_all_orders/","get",params,payload);
        
        promise.then((response)=>{
           
            setOrders(response.data);
            setNoOfOrders(response.data.length);
            SetDisplay(orders.slice(0,20));
        if(response.data.length!==number_of_orders){
            new Audio(sound).play();
            }
        })
       
        
            
        
        
        }
        catch(err){
            console.error(err.message);

        }

        
    }

        useEffect(()=>{
            
            fetchorders();
            
            
        const intervalId=setInterval(()=>{
            setLoad(!load);
            
        },1000)
        setLoading(false);
        return () => clearInterval(intervalId);
        },[load])
        

        
    
    
  

    return(
        <div>
            {
                loading===true?(<Loader/>):(
                    <div>
                        <h4>Table Orders Dashboard</h4>
                        <div className="cards-dashboard">
                            

                            
                            {
                                display?
                                display.map((order,index)=>{
                                    
                                    
                                    return (
                                        <CardOrders  order={order}  key={index} />

                                    )
                                    
                                }
                                ):<Loader/>
                            }


                            
                        </div>
                        

                        
                    </div>
                )
            }
            
            



        </div>

    )
}

export default Dashboard;