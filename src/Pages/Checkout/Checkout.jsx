import React, { useState } from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import Estimate from '../../Components/Estimate/Estimate'
export default function Checkout() {
    const number = localStorage.getItem("phone")
    const name1 = localStorage.getItem("name")
    const [phone] = useState(number)
    const [name] = useState(name1)
    localStorage.setItem("items", JSON.stringify([]))
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            <Nav />
            <Estimate phone={phone} name={name}/>
            <Footer />

        </div>
        </>
    )
}
