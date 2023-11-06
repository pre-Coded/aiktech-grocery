import React, { useState, useEffect } from 'react'
import './ExpressForm.css'
import Product from './Product'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { categoryList, productList, addtoCart } from '../../api/request.api'
import scooter from '../Requestform/scooter.svg'
// import { Link } from 'react-router-dom'
import Search from './Search'

export default function ExpressForm() {
    
    const [product, setProduct] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const handleToggle = (value) => {
        setRefresh(value);
    }
    const [category, setCategory] = useState(' ')
    const [categorylist, setCategorylist] = useState([])
    useEffect(() => {
        axios({
            url: categoryList,
            method: 'GET',
          })
          .then((res) => {
            if (res.data.status === 404) {
                console.log(res.data)
            } else {
                setCategorylist(res.data.data)
                let cate = res.data.data.find(o => o.name.toLowerCase() === 'best sellers');
                
                if (cate){
                    setCategory(cate.name)
                }
                else{
                    setCategory(res.data.data? res.data.data[0].name: "")
                    
                }
                
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    useEffect(() => {
        axios({
            url: `${productList}${category}/`,
            method: 'GET',
          })
          .then((res) => {
            if (res.data.status === 404) {
                console.log(res.data)
            } else {
                setProduct(res.data.data)
                let items = JSON.parse(localStorage.getItem("items"))
                if (items.length===0){
                    res.data.data.map((i, index)=>{
                        items.push({product: i.id, quantity: 0})
                        localStorage.setItem("items", JSON.stringify(items))
                        return 0
                    })
                }
                else{
                    let newValue = [];
                    res.data.data.map((i, index)=>{
                        newValue.push({product: i.id, quantity: 0})
                        return 0
                    })
                    const results = newValue.filter(({ product: id1 }) => !items.some(({ product: id2 }) => {
                        return id2 === id1
                    }));
                    items = [...items, ...results]
                    localStorage.setItem("items", JSON.stringify(items))
                    
                }
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [category])
    const [state, setState] = useState({phone: "", name: "", address: ""})
    const handleChange = (e)=>{
        setState({...state, [e.target.name]: e.target.value})
    }
    window.localStorage.setItem("phone", state.phone)
    window.localStorage.setItem("name", state.name)
    window.localStorage.setItem("address", state.address)

    const handleCart = (e)=>{
        e.preventDefault()
        let items = JSON.parse(localStorage.getItem("items"))
        
        var check = 1
        items.map((i)=>{
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
            url: `${addtoCart}${state.name}/${state.phone}/`,
            method: 'POST',
            data: {items: items},
          })
          .then(res=>{
            if (res.data.status===201){
                document.getElementById('loader-up').classList.toggle("loader-show")
                handleToggle(refresh? false: true)
                setRedirect(true)
                localStorage.removeItem("items")
                localStorage.setItem("items", JSON.stringify([]))

            }
            else if (res.data.status===400){
                // setLoading(false);
               
                document.getElementById('loader-up').classList.toggle("loader-show")
                
                // alert("Phone number must be valid.");
            }
          })
          .catch(error => {
            document.getElementById('loader-up').classList.toggle("loader-show")
            console.log("NETWORK ERROR!")
            alert("Network Error");

          });
    }
    if (redirect){
        return <Redirect to="/checkout" />
    }
    return (
        <>
        <div className="row forms my-4 mb-5">
            <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                <div className="label mt-3 py-3">
                    <label htmlFor="name">Name *</label>
                </div>
                <input 
                    className="input"
                    type="text" 
                    name = "name"
                    id="name" 
                    onChange={handleChange}
                    value={state.name}
                    required
                />
                <p className="dim-text">
                    We will use your name to send the invoice with a little thank you Card for ordering through us.
                </p>
                <div className="label mt-3 py-3">
                    <label htmlFor="mobileno">Mobile No. *</label>
                </div>

                <input 
                    className="input"
                    type="text" 
                    name = "phone"
                    id="mobileno"  
                    onChange={handleChange}
                    value={state.phone}
                    required
                />
                <p className="dim-text">
                    Your mobile no. will be used to send you updates about your order. We will never spam you.
                </p>
                <div className="label mt-3 py-3">
                        <label htmlFor="mobileno">Address *</label>
                    </div>
                    <textarea
                        className="input mt-2"
                        type="text" 
                        name = "address"
                        id="address" 
                        onChange={handleChange}
                        value={state.address}
                        
                    />
                    <p className="dim-text" id="dim-text-1">
                        Put your address if you want to. If not, we will call you and ask for it.
                    </p>
            </div>
            <div className="col-lg-3 col-md-3 col-12"></div>
            <div className="col-lg-6 col-md-5 col-12 col-sm-5 d-none d-md-block">
                <img src={scooter} alt="" className="scooter-img"/>
            </div>
        </div>
        <p className="small_headline fill-color">Products available</p>

        <Search />
        {/* For Category */}
        <div id="product-container">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-12 p-2 col-lg-12 ms-1">
                        {/* <button 
                            className={`btn btn-outline-light filter-button mb-2 ${category==="all"?"active": ""}`}
                            onClick={(e)=>{
                                setCategory(e.target.value.toLowerCase())
                            }}
                            value="All"
                        >
                            All
                        </button>      
                        <span className="p-2"></span> */}
                    {categorylist? categorylist.map((i, index)=>(
                        <span key={index}>
                            {
                                i.name.toLowerCase()==="diwali special" || i.name.toLowerCase()==="diwali day order"?
                                <div className="animate-out" id="animate-fetti">
                                    <lottie-player 
                                        id="loader-canfetti"
                                        src="https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"  
                                        background="transparent"  
                                        speed="1"  
                                        loop autoplay
                                    >
                                        
                                    </lottie-player>
                                </div>: null
                            }
                        <button 
                            className={`btn btn-outline-light ${(i.name.toLowerCase()==="diwali special" || i.name.toLowerCase()==="diwali day order")? "special-filter bubble-button": "filter-button"} mb-2 ${category===i.name?"active": ""}`}
                            onClick={(e)=>{
                                setCategory(e.target.value);
                                if (e.target.value.toLowerCase()==="diwali special"){
                                    document.getElementById("animate-fetti").style.display="inline-block";
                                    setTimeout(()=>{
                                        document.getElementById("animate-fetti").style.display="none";
                                    }, 6000)
                                }
                                else if (e.target.value.toLowerCase()==="diwali day order"){
                                    document.getElementById("animate-fetti").style.display="inline-block";
                                    setTimeout(()=>{
                                        document.getElementById("animate-fetti").style.display="none";
                                    }, 6000)
                                }
                            }}
                            value={i.name}
                        >
                            {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                            {/* {} */}
                        </button>      
                        <span className="p-2"></span>
                        </span>
                    )): null}
                    
                
                </div>
            </div>
        
            {/*end  For Category */}
            <div id="product-container">
                <div className="row scroll-wrapper py-3 ps-2 pe-3">
                    {
                        product.map((i, index)=>{
                            return(<Product 
                                productname={i.product_name} 
                                outOfstock = {i.out_of_stock}
                                price={i.price} id={i.id} 
                                key={index} 
                                index={index}
                                handleToggle={handleToggle} 
                                refresh={refresh} 
                                description={i.description}
                                photo={i.photo}
                                />)
                            })
                    }
                </div>
            </div>
        

            <div className="mt-3 text-center">
                <form onSubmit={handleCart}>
                    <button className="btn btn-light submit_button" type="submit">Checkout</button>
                </form>
            </div>
        </div>    
       </>     
    )
}
