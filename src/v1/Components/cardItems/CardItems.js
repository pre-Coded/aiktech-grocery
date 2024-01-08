import React from "react";
import './cardItems.scss'
import CardItemsTemplate from "./CardItemsTemplate";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Carditems() {
    const history = useHistory()
    const location = useLocation();
    const data = location.state

    if(Object.is(data,undefined)){
        history.push('/cms');
        window.location.reload(true)
    }

    function clickHandler() {
        history.push('/cms');
    }

    return (
        <div 
            className="table-stock overflowY-scroll" 
            style={{
                flexDirection : 'column',
                gap : '20px',
                padding : '2rem', 
                width : '100vw', 
                height : '80vh',
                display : 'flex',
            }}
        >
            <h3 className="text-uppercase" style={{textAlign : 'center'}}>Order Items</h3>
            <table className="overflow-scroll flex-1">
                <thead className="">
                    <th>Order Id</th>
                    <th>Product Id</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Final Price</th>
                </thead>

                <tbody>
                    {
                        data.map((record, index) => {
                            return (
                                <tr className="" key={`${record.order_id}`}>
                                    <td>{record.order_id}</td>
                                    <td>{record.product_id}</td>
                                    <td>{record.title}</td>
                                    <td>{record.quantity}</td>
                                    <td>{record.price}</td>
                                    <td>{record.final_price}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="flex-row place-item-center">
                <button className="btn-none btn-primary" onClick={clickHandler}>
                    Dashboard
                </button>
            </div>
        </div>
    )
}

