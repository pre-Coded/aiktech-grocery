import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import OrderRecent from '../../Components/AllRecentOrders/OrderRecent'

export default function AllRecentOrder() {
    if (!localStorage.getItem('orders')){
        localStorage.setItem('orders', JSON.stringify([]))
    }

    // window.setTimeout(function () {
    //     window.location.reload();
    //   }, 30000);
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            {/* <Nav /> */}

            <OrderRecent />
            
            {/* <Footer /> */}

        </div>
        </>
    )
}
