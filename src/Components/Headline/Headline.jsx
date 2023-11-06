import React from 'react'
import './Headline.css'
import fast1 from './fast-activated.svg'
import fast2 from './fast-deactivated.svg'
import info from './info.svg'
import e1 from './e-activated.svg'
import e2 from './e-deactivated.svg'

export default function Headline({toggle, setToggle}) {
    const handleCheck = (event) => {
        
        // let value = event.target.checked;
        setToggle(toggle? false: true);
    }
    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="tagline">
                    <h1 className="main_headline">Get Groceries delivered in </h1>
                    <h1 className="neonText"> &nbsp; 10 Minutes.</h1>
                </div>
                <p className="small_headline pt-3">
                    <img src={info} alt="info" />
                    {toggle?"  Make a list of everything and anything and get it with Phurti Everything Delivery.": "  Get your Grocery Delivered Instantly with Phurti Express."}
                </p>
                <div className="toggle justify-content-center">
                    <div className="toggle-container">
                        <button 
                            className={`btn fw-bold my-auto small  ${toggle?"": "location text-light p-2"}`}
                            onClick={handleCheck}
                            
                        >
                            {toggle?<img src={fast2} alt=""/>: <img src={fast1} alt=""/>} 
                            <span className="">Express Delivery</span>
                        </button>
                            
                        
                        {/* <-------- Toggle button -------->
                        <span className="px-4">
                            <input type='checkbox' id='check' checked={toggle} onChange={handleCheck} />
                            <label htmlFor='check'>
                            </label>
                        </span> */}
                       

                        <button 
                            className={`btn fw-bold my-auto small ${toggle?"location text-light p-2": ""}`}
                            onClick={handleCheck}
                        >
                            {toggle?<img src={e1} alt=""/>: <img src={e2} alt=""/>}  
                            <span className="">Create Your Order List</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-3"></div>
                {/* <span className={`small_headline spant-3 col-md-6 mt-4 border p-3 my-auto fade-animation`}> 
                50 % Cashback*  upto Rs. 100 on every alternate order for Ittina Akkala Residents.
                
                </span> */}
                
                <div className="col-md-4"></div>
              

                {/* <span className={`location col-md-4 col-sm-12 col-12 mt-3 mx-auto p-2 ${toggle?"d-none": ""}`}>
                    <i className="fa fa-map-marker small_small_headline"></i> Only available in XYZ society, HSR Layout
                </span> */}
                
            </div>
        </div>
    )
}
