import React, { useState, useEffect } from 'react'
import './ExpressForm.css'
export default function Product({productname, price, id, handleToggle, refresh, description, index, photo, outOfstock}) {
    const data = {
        name: localStorage.getItem("name"),
        phone: localStorage.getItem("phone"),       
    }
    
    const initialState = {
        quantity: 0,
        product: id
    }
    const [body, setBody] = useState(initialState)
    const [count, setCount] = useState(0)
    useEffect(() => {
        let items = JSON.parse(localStorage.getItem("items"))
        if (items){
            items.map((i, index)=>{
                if (i.product===id){
                    setCount(i.quantity)
                }
                return 0
            })
        }
    }, [id])
    const handleChange = (event)=>{
        setBody({...body, [event.target.name]: event.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (data.name==="undefined" && data.phone==="undefined"){
            alert("Please fill name or phone properly!")
            setCount(count-1)
            return
        }
        if (data.name==="" && data.phone===""){
            alert("Please fill name or phone properly!")
            setCount(count-1)
            return
        }
        let items = JSON.parse(localStorage.getItem("items"))
        items.map((i, index)=>{
            if (i.product===id){
                i.quantity=count
                setCount(i.quantity)
            }
            return 0
        })
        localStorage.setItem("items", JSON.stringify(items))

    }
    return ( 
        <div className="product-list m-3 col-md-4 col-12 col-sm-12 card-small mobile">
            <div className="product product-show my-4 text-center justify-content-center d-none d-lg-block d-md-block d-sm-block">
                <div className="rect">
                    <img src={photo} alt="" />
                </div>
                
            </div>


            <div className="desktop-view">
                <div className="my-4 ms-2 d-none d-lg-block d-md-block d-sm-block">
                    <h5 className="m-auto">{productname}</h5>
                    <h6 className="fill-color m-auto mt-3">{description}</h6>
                    
                </div>
            </div>
            
            <div className="product product-show my-4 hide d-product">
                <div className="rect">
                    <img src={photo} alt="" />
                </div>
                <div className="mobile-view">
                    <h5 className="">{productname}</h5>
                    <h6 className=" fill-color">{description}</h6>
                    <h6 className="">₹{parseFloat(price).toFixed(2)}</h6>
                </div>
            </div>


            <form onSubmit={handleSubmit} className="my-auto forms product" >
                <h6 className="my-auto me-4 d-none d-lg-block d-md-block d-sm-block ps-2">₹{parseFloat(price).toFixed(2)}</h6>
                <button 
                    className={`btn btn-outline-light justify-content-end ms-auto additem me-2 ${count>0? "d-none": ""}`} 
                    type="submit" 
                    onClick={()=>{
                        setCount(count+1)
                        return  handleSubmit
                    }}
                    disabled={outOfstock? true: false}
                >
                    {outOfstock? <small>Out of Stock</small>: "Add"}
                </button>
                        
                
                    
                <div className={`product ${count>0? "": "d-none"}`} >
                    <button 
                        type="submit"
                        className="btn btn-outline-light count-button-minus" 
                        onClick={()=>{
                            if (count>-1){
                                setCount(count-1)
                            }
                            return  handleSubmit
                        }}
                    >
                        -
                    </button>
                    
                    <span className="count">
                        <input 
                            className="my-auto text-center" 
                            type="text" 
                            pattern="[0-9]*" 
                            min="-1" 
                            placeholder="1"
                            onChange={handleChange} 
                            name = "quantity"   
                            value = {count}
                            readOnly
                        />
                    </span>
                
                    <button 
                        type="submit"
                        className="btn btn-outline-light count-button-plus"
                        onClick={()=>{
                            
                            setCount(count+1)
                        }}
                    >
                        +
                    </button>
                </div>
                    
            </form>
           
        </div>
    )
}
