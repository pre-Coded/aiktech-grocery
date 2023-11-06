import React, { useState } from 'react'
// import surf from '../../Components/ExpressForm/surf.png'
import './Estimate.css'

export default function Totalprice({productname, price, quantity, description, id, index, handlebill, sum, final_item, photo}) {
    let quat = quantity
    const [count, setCount] = useState(quat)
    const [prev, setPrev] = useState(0)
    // console.log("count",count)
    const handleSubmit = (e)=>{
        e.preventDefault()
        let diwali, paan;
        let items = JSON.parse(localStorage.getItem("items"))
        items[index] = { ...items[index], product: id, quantity: count}
        if (items[index].cate.toLowerCase()==="diwali day order"){
            diwali = count;
        }
        if (items[index].cate.toLowerCase()==="paan"){
            paan = count;
        }
        localStorage.setItem("items", JSON.stringify(items))
        let j = sum-prev*price
        let total = j+count*price
        let item = final_item-prev
        let itemTotal = item+count
        handlebill(total, itemTotal, diwali, paan)

    }

    return (
        <>
        <div className={`product-list mt-3 flex-row ${count===0? "d-none": ""}`}>
            <div className="product product-show my-4 items col-lg-5 col-md-4 col-sm-3">
                <div className="rect">
                    <img src={photo} alt="" />
                </div>
                <div className="mobile-view">
                    <h5 className="">{productname}</h5>
                    <h6 className=" fill-color">{description}</h6>
                    <h6 className="">₹{price}</h6>
                </div>
            </div>
            <div className="col-lg-5 col-md-3 col-sm-4 col-3"></div>
            <form 
                onSubmit={handleSubmit} 
                className="my-auto forms col-lg-5 col-md-4 col-sm-3" >
                <button 
                    className={`btn btn-outline-light justify-content-end additem me-2 ${count>0? "d-none": ""}`} 
                    type="submit" 
                    onClick={()=>{
                        setPrev(count)
                        setCount(count+1)
                        return  handleSubmit
                    }}
                >
                    Add Item
                </button>
                        
                
                    
                <div className={`product ${count>0? "": "d-none"}`} >
                    <button 
                        type="submit"
                        className="btn btn-outline-light count-button-minus" 
                        onClick={()=>{
                            if (count>-1){
                                setPrev(count)
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
                            name = "quantity"   
                            value = {count}
                            readOnly
                        />
                    </span>
                
                    <button 
                        type="submit"
                        className="btn btn-outline-light count-button-plus"
                        onClick={()=>{
                            setPrev(count)
                            setCount(count+1)
                        }}
                    >
                        +
                    </button>
                </div>
                    
            </form>
            
        
        </div>
        <div className={`b-top w-100 mt-4 ${count===0? "d-none": ""}`}></div>
        </>
    )
}

