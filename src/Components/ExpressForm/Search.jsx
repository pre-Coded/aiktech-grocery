import React, { useState } from 'react'
import './ExpressForm.css'
import { productSearch, getProduct } from '../../api/request.api'
import axios from 'axios'
import ProductSearch from './ProductSearch'
import Category from './Category'

export default function Search() {
    const [product, setProduct] = useState([])
    const [show, setShow] = useState(false)
    const [item, setItem] = useState([])
    const getData = (e) => {
        let q = e.target.value
        if (q.length===0){
            q = "m"
        }
        axios({
            url: `${productSearch}${q}/`,
            method: 'GET',
        })
        .then((res) => {
            if (res.data.status === 404) {
                console.log("Not Found")
                setProduct([])
            } else {
                setProduct(res.data.search)
            }
        })
        .catch((err) => {
            console.log("Network Error");
                
        });
       
    }
    const debounce = function (fn, d) {
    let timer;
    return function () {
        let context = this
        // args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
        getData.apply(context, arguments);
        }, d);
    }
    }

    const handleSearch = debounce(getData, 400);

    const handleProduct = (e)=>{
        e.preventDefault()
        if (e.target.id){
            axios({
                url: `${getProduct}${e.target.id}/`,
                method: 'GET',
            })
            .then((res) => {
                if (res.data.status === 404) {
                    console.log("Not Found")
                    setItem([])
                } else {
                    setItem(res.data.data)
                    // setShow(false)
                    document.getElementById("product-container").style.display="none"
                    document.getElementById("search-product-container").style.display="block"
                    setShow(false)
                    let items = JSON.parse(localStorage.getItem("items"))
                    if (items.length===0){
                        [res.data.data].map((i, index)=>{
                            items.push({product: i.id, quantity: 0})
                            localStorage.setItem("items", JSON.stringify(items))
                            return 0
                        })
                    }
                    else{
                        let newValue = [];
                        [res.data.data].map((i, index)=>{
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
                setItem([])
                console.log("Network Error");
                
            });
        }
        else{
            setItem([])
        }

    }
    return (
        <>
        <div onMouseLeave={()=>{setShow(false)}}>
            <div className="search-container my-3 col-md-6">
                <button 
                    className="btn fa fa-search search-icon" 
                    type="button"
                    style={{
                        width: "10%",
                        margin: "auto",
                        textAlign: "center",
                        color: "#fff",
                        boxShadow: "none!important"
                    }}
                >
                    
                </button>
                
                <input 
                    className="search-input ps-2"
                    type="text" 
                    name="query" 
                    id="" 
                    onChange={()=>{setShow(true)}}
                    onClick={()=>{setShow(true)}}
                    onKeyUp={handleSearch}
                    placeholder="Search for products"
                    autoComplete="off"
                    style={{
                        background: "transparent",
                        border: "none",
                        width: "90%",
                        verticalAlign: "middle",
                        outline: "0px",
                        color: "#fff"
                    }}
                />

            </div>
            <div 
                className={`search-result-container-block col-md-6 ${show? "": "d-none   "}`}
                style={{
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: "134",
                    minHeight: "0px",
                    maxHeight: "150px",
                    overflowY: "scroll",
                    position: "relative",
                }}
            >
                {product ? product.length!==0? product.map((i, index)=>(
                    i.category? 
                    <div 
                        className="search-result"
                        key={index}
                        onClick={handleProduct}
                        >

                        <button className="btn fa fa-search search-icon" type="button"></button>
                        <p 
                            className="search-input my-auto ps-2"
                            style={{
                                background: "transparent",
                                border: "none",
                                width: "90%",
                                verticalAlign: "middle",
                                outline: "0px",
                                color: "#fff"
                            }}
                            id={i.id}
                        >{i.title}</p>
                        
                    </div>: null
                )): 
                <div 
                    className="search-result"
                    >

                    <button className="btn fa fa-search search-icon" type="button"></button>
                    <p 
                        className="search-input my-auto ps-2"
                        style={{
                            background: "transparent",
                            border: "none",
                            width: "90%",
                            verticalAlign: "middle",
                            outline: "0px",
                            color: "#fff"
                        }}
                        
                    >Search result not found.....</p>
                </div>: null
                }
                
            </div>

        </div>
        
        {item.length!==0? 
            <div id="search-product-container">
                <Category cat={item.category.name}/>
                <ProductSearch product={[item]}/>
            </div>
            : null}
        </>
    )
}
