import React, { useState, useEffect } from 'react'
import { WEBSITE, BILL } from '../../v1/Utils'
import { Link } from 'react-router-dom'

export default function Orderlist({data}) {
    const [read, setRead] = useState(0)
    const [show, setShow] = useState(false)
    useEffect(() => {
        let orders = JSON.parse(localStorage.getItem("orders"))
        if (orders){
            setRead(0)
            orders.map((i)=>{
                if (i.order===data.id){
                    setRead(i.read)
                }
                return 0
            })
        }
    }, [data.id])
    const handleRead  = (e)=>{
        e.preventDefault()
        let orders = JSON.parse(localStorage.getItem("orders"))
        orders.map((i, index)=>{
            if (i.order===data.id){
                if (!i.read){
                    i.read=1
                }
                
                setRead(i.read)
            }
            return 0
        })
        localStorage.setItem("orders", JSON.stringify(orders))
    }
    return (
        <>
        <div 
            className="col-md-6 col-sm-6 col-lg-4 col-12 click-card"
            onClick={handleRead}
        >
            <div className={`custom-card p-3 m-2 ${read? "color-read": " color-unread"}`}>
                <div className="custom-card-user">
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Name: </span>{data.user.name? data.user.name: "-"}
                    </div>
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Phone Number: </span>{data.user.phone? data.user.phone: "-"}
                    </div>

                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Invoice: </span>
                        <a 
                            href={data.invoice_url} 
                            onClick={()=>{
                                window.open(data.invoice_url, '_blank', 'noopener,noreferrer')
                            }}>
                            {data.invoice_url}
                        </a>
                    </div>

                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Amount: </span>{ parseFloat(data.total_price).toFixed(2)}
                    </div>

                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Payment link: </span>
                        <a 
                            style={{fontSize: "0.8rem"}}
                            href="https://paytm.me/MDsZ-nA" 
                            onClick={()=>{
                                window.open("https://paytm.me/MDsZ-nA", '_blank', 'noopener,noreferrer')
                            }}>
                            https://paytm.me/MDsZ-nA
                        </a>
                    </div>

                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Order Source: </span>
                        {data.source ? 
                            data.source===WEBSITE? 
                                WEBSITE: BILL
                            : "-"}
                    </div>
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Delivery Type: </span>{data.delivery_type}
                    </div>
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Ordered At: </span>
                        <small className="fw-bold">
                        ({data.created_on.split("T")[1].split("+")[0].split(":")[0]}:{data.created_on.split("T")[1].split("+")[0].split(":")[1]})
                        </small>
                        &nbsp;
                        {data.created_on.split("T")[0]}
                    </div>
                    
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Address: </span>{data.checkout_address && data.checkout_address.split("\n")[0]}
                    </div>
                    
                    <div className="custom-card-user-img">
                        <span className="fw-bold px-2">Delivered: </span>
                        {
                            data.delivered?
                            <i className="fa fa-check color-green"></i>
                            : <i className="fa fa-close color-red"></i>
                        }
                    </div>
                    
                  
                </div>
                <button 
                    className="btn btn-outline-light m-2 mt-4 custom-card-user"
                    onClick={()=>{
                        setShow(!show)
                    }}    
                >
                    {show? "Hide Details": "Show Details"}
                </button>
                {
                    show? 
                        <>
                            <div className="custom-card-user-img">
                                <div className="b-top w-100 my-3"></div>
                                <h5 className="fw-bold px-2">Order List:</h5>
                                <div className="b-top w-100 my-3"></div>
                                
                                {data.delivery_type==="EXPRESS"? data.cart.map((i, index)=>(
                                    <div className="custom-card-user" key={index}>
                                        <div className="custom-card-user-img">
                                            <span className="fw-bold px-2">Product Name: </span>{i.product_name}
                                        </div>
                                        <div className="custom-card-user-img">
                                            <span className="fw-bold px-2">Description: </span>{i.Description}
                                        </div>
                    
                                        <div className="custom-card-user-img">
                                            <span className="fw-bold px-2">Quantity: </span>{String(i.Quantity)}
                                        </div>
                                        <div className="b-top w-100 my-3"></div>
                                    
                                    </div>
                                )): 
                                <div className="custom-card-user">{data.orderlist}</div>
                                }
                            </div>
                        </>
                
                    : null
                }
                
            </div>
        </div>
        </>
    )
}
