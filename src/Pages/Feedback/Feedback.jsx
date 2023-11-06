import React, { useState } from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Dots from '../../Components/Request/dots.svg'
import Loader from '../../Components/Loader/Loader'
import './Feedback.css'
import { feedBack } from '../../api/request.api'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default function Feedback(props) {

    const [redirect, setRedirect] = useState(false)
    const [rating, setRating] = useState(null)
    const [hoverrating, sethoverRating] = useState(null)
    const order_detail_id = props.match.params.orderid
    const [comment, setComment] = useState("")
    const handleChange = (e)=>{
        setComment(e.target.value)
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        document.getElementById('loader-up').classList.toggle("loader-show")
        let data = {
           "order_id": order_detail_id,
           "rating": rating,
           "comments": comment
        }
        axios({
            url: feedBack,
            method: 'POST',
            data: data,
          })
          .then(res=>{
            if (res.data.status===201){
                setTimeout(()=>{
                    document.getElementById('loader-up').classList.toggle("loader-show")
                    setRedirect(true)
                }, 2000)
            }
            else if (res.data.status===400){
                setTimeout(()=>{
                    document.getElementById('loader-up').classList.toggle("loader-show")
                }, 2000)
                alert("Order details not found!");
            }
          })
          .catch(error => {
            setTimeout(()=>{
                document.getElementById('loader-up').classList.toggle("loader-show")
            }, 2000)
            alert("Something went wrong!");

          });
    }
    if (redirect){
        return <Redirect to="/feedback-sent"/>
    }
    return (
        <>
        <Loader />
        <div className="container-fluid pt-3">
            <Nav />
            <div className="container mt-5">
                <div className="row mt-5">
                    
                    <div className="col-md-3 col-12"></div>
                    <div className="col-md-6 col-12 feedback_form_inner">
                        <form onSubmit={handleSubmit}>
                        <h3>Rate your experience</h3>
                        <div className="b-top w-100 mb-3"></div>
                        <div className="label py-3">
                                <label htmlFor="comments">Did you like our service?</label>
                        </div>
                        {[...Array(5)].map((star, index)=>{
                            return(
                                <label key={index}className="px-1">
                                    <input 
                                        type="radio" 
                                        name="" 
                                        value={index+1} 
                                        onClick={()=>{
                                            setRating(index+1)
                                        }}
                                        required
                                        
                                    />
                                    <i 
                                        className={`fa fa-star start_button fa-3x ${index< (hoverrating || rating) ? "yellow":"gray"}`}
                                        onMouseOver={()=>{
                                            sethoverRating(index+1)
                                        }}
                                        onMouseLeave={()=>{
                                            sethoverRating(null)
                                        }}
                                    ></i>
                                </label>
                            )
                        })}

                        <div className="label py-3">
                                <label htmlFor="comments">Please tell us more *</label>
                        </div>
                        <textarea
                            className="feedback_textarea mt-2"
                            type="text" 
                            name = "comments"
                            onChange={handleChange}
                            required
                            
                        />
                        
                        <button className="btn btn-light mt-1" type="submit">Send <i className="fa fa-paper-plane"></i></button>
                        </form>
                        
                    </div>
                    <div className="col-md-3 col-12"></div>
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
