import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get_invoice } from '../../api/request.api'

export default function Invoiceslip({id}) {
    const [invoice, setInvoice] = useState([])
    const [invoiceitem, setInvoiceitem] = useState([])
    const [deliverycharge, setDeliverycharge] = useState(0)
    const [packagingcharge, setPackagingcharge] = useState(0)

    useEffect(() => {
        axios({
            url: `${get_invoice}${id}/`,
            method: 'GET',
          })
          .then((res) => {
            if (res.data.status === 400) {
                setInvoice([])
                setInvoiceitem([])
                return alert("Details not found!")
                
            } else {
                setInvoice(res.data.data)
                setInvoiceitem(res.data.items)    
                setDeliverycharge(res.data.delivery_charge)   
                setPackagingcharge(res.data.packaging_charge)
            }
          })
          .catch((err) => {
            setInvoice([])
            setInvoiceitem([])
            return alert("Something went wrong!")
          });
    }, [id])
    return (
        <div  className="container mt-4">
            <div className="row">
            
                <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-4">
                    <p className="small_headline fill-color">#{invoice.invoice_id}</p> 
                    <div className="b-top w-100 my-3"></div>
                    {/* {invoice.created_on.split("T")[0]} */}
                    <div className="invoice_item" >
                        <div className="col-md-1 col-1 fw-bold invoice_item_element">#</div>
                        <div className="col-md-4 col-4 fw-bold invoice_item_element">Product</div>
                        <div className="col-md-2 col-2 fw-bold invoice_item_element">Qty</div>
                        <div className="col-md-3 col-3 fw-bold invoice_item_element">Price <small>(per unit)</small> </div>
                        <div className="col-md-2 col-2 fw-bold invoice_item_element">Total Price</div>
                        
                    </div>
                    <div className="b-top w-100 my-3"></div>
                    {invoiceitem? 
                        invoiceitem.map((i, index)=>(
                            <>
                            <div className="invoice_item" key={index}>
                                <div className="col-md-1 col-1 invoice_item_element">{index+1}.</div>
                                <div className="col-md-4 col-4 invoice_item_element pe-1">{i.title? i.title: "-"}{i.description?` (${i.description})`: ''}</div>
                                <div className="col-md-2 col-2 invoice_item_element">{parseFloat(i.quantity).toFixed(2)} {i.unit_id}</div>
                                <div className="col-md-3 col-3 invoice_item_element">{parseFloat(i.price).toFixed(2)}</div>
                                <div className="col-md-2 col-2 invoice_item_element">₹ {i.description.toLowerCase()==='g'||i.description.toLowerCase()==='ml'?(i.price*i.quantity)/1000:(i.price*i.quantity)}</div>
                                
                            </div>
                            <div className=" my-4"></div>
                            </>
                        ))
                        :null
                    }
                    
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 col-12 p-0 m-0"></div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-4">
                    <p className="small_headline fill-color">PRICE DETAILS</p>
                    <div className="b-top w-100"></div>

                    <div className="row p-2 mt-4">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Price</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">{invoice.final_price? `₹${invoice.final_price-deliverycharge-packagingcharge}`: "-"}</div>
                    </div>
                    <div className="row p-2 mt-2">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Delivery Charge</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">{deliverycharge? `₹${deliverycharge}`: "-"}</div>
                    </div>
                    <div className="row p-2 mt-2">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Packaging Charge</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">{packagingcharge? `₹${packagingcharge}`: "-"}</div>
                    </div>
                    <div className="b-top w-100"></div>

                    <div className="row p-2 mt-4 my-auto">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Total Amount</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">₹{parseFloat(invoice.final_price).toFixed(2)}</div>
                    </div>

                    <div className="b-top w-100 mt-4"></div>

                </div>

                
            </div>
        </div>
    )
}
