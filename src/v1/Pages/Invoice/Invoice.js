import React from 'react'
import Invoiceslip from './Invoiceslip'
import './Invoice.scss'
import { useParams } from 'react-router'

export default function Invoice(props) {
    const { orderid } = useParams();
    return (
        <>
            <div className="invoice-container">
                <Invoiceslip id={orderid} />
            </div>
        </>
    )
}
