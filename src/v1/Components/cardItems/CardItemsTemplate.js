import React from "react";
import './cardItems.scss'


const CardItemsTemplate=({record})=>{
    console.log(record);
    return(
        <div>
                <tr>
                    <td>{record.order_id}</td>
                    <td>{record.product_id}</td>
                    <td>{record.title}</td>
                    <td>{record.quantity}</td>
                    <td>{record.price}</td>
                    <td>{record.final_price}</td>
                </tr>
        </div>
    )
}
export default CardItemsTemplate;