import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import Order from '../../Components/Order/Order'

export default function Allorder() {
    if (!localStorage.getItem('orders')){
        localStorage.setItem("orders", JSON.stringify([]))
    }

    // window.setTimeout(function () {
    //     window.location.reload();
    //   }, 30000);
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            {/* <Nav /> */}

            <Order />
            
            {/* <Footer /> */}

        </div>
        </>
    )
}
