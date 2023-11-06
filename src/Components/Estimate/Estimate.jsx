import React, { useState, useEffect } from 'react'
import Totalprice from './Totalprice'
import axios from 'axios'
import { showCart, placeOrder, addtoCart } from '../../api/request.api'
import { Redirect } from 'react-router-dom'

export default function Estimate({phone, name}) {
    // const initialState ={
    //     product_name: "Amul",
    //     original_price: 49,
    //     quantity: 4
    // }
    const [refresh, setRefresh] = useState(false)
    const handleToggle = (value) => {
        setRefresh(value);
    }
    const [state, setState] = useState([])
    const [sum, setSum] = useState("")
    const [id, setId] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [final_item, setFinal_item] = useState('')

    const [diwali, setDiwali] = useState(false)
    const [paan, setPaan] = useState(false)
    const [check, setCheck] = useState(false)

    const handlebill = (s, i, d, p)=>{
        setSum(s);
        setFinal_item(i)
        if (d===0){
            setDiwali(false)
        }
        if (p===0){
            setPaan(false)
        }
    } 
    const handleCheck = (e)=>{
        setCheck(e.target.checked)    
    }
    useEffect(() => {
        axios({
            url: `${showCart}${phone}/${name}/`,
            method: 'GET',
          })
          .then((res) => {
            if (res.data.status === 400) {
                setState([])
            } else {
                if (res.data.cartitem){
                    setState(res.data.cartitem)
                    setSum(res.data.final_price)
                    setId(res.data.data[0].id)
                    setFinal_item(res.data.final_item)
                    
                    res.data.cartitem.map((i, index)=>{
                        let items = JSON.parse(localStorage.getItem("items"))
                        if (i.category.toLowerCase()==="diwali day order"){
                            setDiwali(true)
                        }
                        if (i.category.toLowerCase()==="paan"){
                            setPaan(true)
                        }
                        items.push({product: i.id, quantity: i.quantity, cate: i.category})
                        localStorage.setItem("items", JSON.stringify(items))
                        return 0
                    })
                }
                
                
            }
          })
          .catch((err) => {
            setState([])
            
          });

    }, [phone, refresh, name])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (id.length===0){
            alert("Please add cart items!")
            return
        }
        let name = localStorage.getItem("name")
        let cartData = JSON.parse(localStorage.getItem("items"))
        var check = 1
        cartData.map((i)=>{
            if (i.quantity===0){
                console.log("Items not added.")
            }
            else{
                check = 0
            }
            return 0
        })
        if (check){
            return alert("Please add items to the cart!!")
        }
        document.getElementById('loader-up').classList.toggle("loader-show")
        axios({
            url: `${addtoCart}${name}/${phone}/`,
            method: 'POST',
            data: {items: cartData},
          })
          .then(res=>{
            if (res.data.status===201){
                console.log("cart added")

            }
            else if (res.data.status===400){
                // setLoading(false);
               
                console.log("cart error")
                return
                
                // alert("Phone number must be valid.");
            }
          })
          .catch(error => {
            document.getElementById('loader-up').classList.toggle("loader-show")
            console.log("NETWORK ERROR!")
            alert("Network Error");
            return

          });
        let data = {
            "address": localStorage.getItem("address"),
            "order_list": [],
            "store_name": ''
        }
        setTimeout(()=>{
            axios({
                url: `${placeOrder}${id}/${phone}/${name}/EXPRESS/`,
                method: 'POST',
                data: data
                
              })
              .then(res=>{
                if (res.data.status===201){
                    document.getElementById('loader-up').classList.toggle("loader-show")
                    setRedirect(true)
                }
                else if (res.data.status===400){
                    // setLoading(false);
                   
                    document.getElementById('loader-up').classList.toggle("loader-show")
                    setRedirect(false)
                    // alert("Phone number must be valid.");
                }
              })
              .catch(error => {
                    setRedirect(false)
                    document.getElementById('loader-up').classList.toggle("loader-show")
                    console.log("NETWORK ERROR!")
                    alert("Network Error");
    
              });
        }, 2000)

    }
    if (redirect){
        return <Redirect to="/order-placed"/>
    }
    return (
        <div  className="container mt-4">
            <div className="row">
                {diwali? 
                    <div className={`col-lg-8 col-md-8 col-sm-12 col-12 mt-4 small_headline spant-3 col-md-6 mt-4 border p-3 my-auto fade-animation`}> 
                    
                    Products from Diwali Day Order Section will be delivered on 4th November. Slot timings will be communicated by our valet soon.
                    
                    </div>
                : null}
            
                <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-4">
                    <p className="small_headline fill-color">List of items</p>
                    
                {
                    state.length===0?<span className="">Cart is empty!</span>:state.map((i, index)=>{
                        // console.log("KEY", index)
                        return(
                            <Totalprice 
                                key={index} 
                                index = {index}
                                productname ={i.product_name} 
                                price = {i.original_price} 
                                quantity ={i.quantity} 
                                totalprice={i.quantity*i.original_price} 
                                description={i.description}
                                phone={phone}
                                name={name}
                                id={i.id}
                                handlebill={handlebill}
                                sum={sum}
                                final_item = {final_item}
                                photo={i.photo}
                                handleToggle={handleToggle}
                            />
                        )
                    })
                }
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 col-12 p-0 m-0"></div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-4">
                    <p className="small_headline fill-color">PRICE DETAILS</p>
                    <div className="b-top w-100"></div>

                    <div className="row p-2 mt-4">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Price ({final_item} items)</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">₹{sum}</div>
                    </div>
                    {/* <div className="row p-2 mt-4">
                        <div className="col-lg-6 col-md-6 col-6 col-sm-6">Discount</div>
                        <div className="col-lg-6 col-md-6 col-6 col-sm-6 text-end">-₹20</div>
                    </div> */}
                    <div className="row p-2 mt-4">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Delivery Charge</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">₹10</div>
                    </div>
                    <div className="b-top w-100"></div>

                    <div className="row p-2 mt-4 my-auto">
                        <div className="col-lg-7 col-md-7 col-7 col-sm-7">Total Amount</div>
                        <div className="col-lg-5 col-md-5 col-5 col-sm-5 text-end">₹{sum+10}</div>
                    </div>

                    <div className="b-top w-100 mt-4"></div>

                    {paan? 
                    <div className="row p-2 mt-4 my-auto">
                        
                        <div className="col-lg-12 col-md-12 col-12 col-sm-7">
                        <input 
                            type="checkbox" 
                            id="adult_term"
                            // checked={check}
                            onChange={handleCheck}
                        />
                        <label htmlFor="adult_term">&nbsp; I agree I am 18+ years old.</label> 
                            
                        </div>
                        
                        
                    </div>
                    : null
                    }

                    {/* <p className="small_headline  text-center mt-3 mb-4">You will save ₹10</p> */}
                    <div className="mt-5 text-center">
                        <form onSubmit={handleSubmit}>
                            <button className="btn btn-light submit_button" type="submit" disabled={paan===true? check===true ? false: true: false}>Place order</button>
                        </form>
                        
                    </div>



                </div>

                
            </div>
        </div>
    )
}
