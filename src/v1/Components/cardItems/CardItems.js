import React from "react";
import './cardItems.scss'
import CardItemsTemplate from "./CardItemsTemplate";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export  default function Carditems(){
    const history=useHistory()
    const location=useLocation();
    const data=location.state
    
    if(Object.is(data,undefined)){
        history.push('/dashboard');
        window.location.reload(true)
    }
    
    function clickHandler(){
        history.push('/dashboard');

    }
    return(
        <div className="carditems">
            <h2 className="carditems-h">order items</h2>
            <div className="carditems-wrapper">
                <div >
                    <button className="carditems-back" onClick={clickHandler}>
                        Dashboard
                    </button>
                </div>
            <div className="carditems-card">
               <table>
                <thead>
                <tr className="carditems-headings">
                        <th>order_id</th>
                        <th>product_id</th>
                        <th>title</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>final_price</th>
                    </tr>
                </thead>
                <tbody>
                
                {
                    data.map((record,index)=>{
                        console.log(record);
                        return(
                        <CardItemsTemplate record={record} key={index}/>
                        )
                    })
                }

                </tbody>
               </table>
            </div>
            </div>
        </div>
        
    )
}

