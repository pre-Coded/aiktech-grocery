import React, { useState } from 'react'
import './ExpressForm.css'
import Product from './Product'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { addtoCart } from '../../api/request.api'
// import scooter from '../Requestform/scooter.svg'
// import Search from './Search'
// import { Link } from 'react-router-dom'
export default function ExpressForm({product}) {
    const [redirect, setRedirect] = useState(false)

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
            url: `${addtoCart}${localStorage.getItem("name")}/${localStorage.getItem("phone")}/`,
            method: 'POST',
            data: {items: items},
          })
          .then(res=>{
            if (res.data.status===201){
                document.getElementById('loader-up').classList.toggle("loader-show")
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
        {/* ------------------------------------------------------------------------ */}
        {/* Product List */}
        <div className="row scroll-wrapper py-2 pe-3">
            {
                product.map((i, index)=>{
                    return(<Product 
                        productname={i.product_name} 
                        price={i.price} 
                        id={i.id} 
                        key={index} 
                        description={i.description}
                        photo={i.photo}
                        />)
                    })
            }
        </div>
        {/* Product List */}
        {/* ------------------------------------------------------------------------ */}


        {/* ------------------------------------------------------------------------ */}
        {/* Checkout */}

        <div className="mt-3 text-center">
            <form onSubmit={handleCart}>
                <button className="btn btn-light submit_button" type="submit">Checkout</button>
            </form>
        </div>

        {/* Checkput */}
        {/* ------------------------------------------------------------------------ */}
                
       </>     
    )
}
