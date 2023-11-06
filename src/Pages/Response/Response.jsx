import React, {useState} from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import scooter from '../../Components/Requestform/scooter.svg'
import Dots from '../../Components/Request/dots.svg'
import Loader from '../../Components/Loader/Loader'
import './Response.css'
export default function Response() {
    let text = localStorage.getItem("toggle")
    const [t] = useState(text==="false"?false: true)
    return (
        <>
        <Loader />
        <div className="container-fluid pt-3">
            <Nav />
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col-md-6 col-12">
                        <h1 className="final_headline">
                        {t? "Thanks for contacting us, will get back to you within few minutes.":"Thank you for placing the order. Your items will be delivered in a jiffy."}
                        
                        <div className="small_headline pt-3">-Team Phurti</div>
                        </h1>
                    </div>
                    <div className="col-md-6 col-12">
                        <img src={scooter} alt="" className="scooter-img"/>
                    </div>
                </div>
                <div className="dots">
                    <img src={Dots} alt="" />
                </div>
            </div>
            <Footer />

        </div>
        </>
    )
}
