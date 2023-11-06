import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import Invoiceslip from './Invoiceslip'
import './Invoice.css'

export default function Invoice(props) {
    const order_detail_id = props.match.params.orderid
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            <Nav />
            <Invoiceslip id={order_detail_id} />
            <Footer />

        </div>
        </>
    )
}
