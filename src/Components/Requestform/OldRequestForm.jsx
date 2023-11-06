import React, {useState} from 'react'
import './Requestform.css'
import {Redirect} from 'react-router-dom'
import marker from './mark.svg'
import axios from 'axios'
import {requestService} from '../../api/request.api'
// import Loader from '../Loader/Loader'

export default function Requestform() {
    const initialState = {
        name: '',
        phone: '',
        store_name: '',
        address: '',
        items: ''
        
    }
    const [state, setstate] = useState(initialState)
    const [count, setCount] = useState(1)
    // const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const handleChange = (e)=>{
        setstate({...state, [e.target.name]: e.target.value})

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        // setLoading(true)
        document.getElementById('loader-up').classList.toggle("loader-show")
        axios({
            url: requestService,
            method: 'POST',
            data: state,
          })
          .then(res=>{
            if (res.data.status===201){
                console.log("Order Placed")
                document.getElementById("form").reset();
                setTimeout(()=>{
                    document.getElementById('loader-up').classList.toggle("loader-show")
                    setRedirect(true)
                }, 4000)
                // setLoading(false)
            }
            else if (res.data.status===400){
                // setLoading(false);
                setTimeout(()=>{
                    document.getElementById('loader-up').classList.toggle("loader-show")
                }, 4000)
                alert("Phone number must be valid.");
            }
          })
          .catch(error => {
            // setLoading(false)
            setTimeout(()=>{
                document.getElementById('loader-up').classList.toggle("loader-show")
            }, 4000)
            console.log("NETWORK ERROR!")
            alert("Network Error");

          });

    }

    if (redirect){
        return <Redirect to="/order-placed"/>
    }
    return (
        <>
        <form className="forms" onSubmit={handleSubmit} id="form">
            {count===1?
                <>
                    <div className="label py-3">
                        <label htmlFor="name">Name *</label>
                    </div>
                    <input 
                        className="input"
                        type="text" 
                        name = "name"
                        id="name" 
                        onChange={handleChange}
                        value={state.name}
                        autoFocus
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
                        <label htmlFor="mobileno">Store Name (Optional)</label>
                    </div>

                    <input 
                        className="input"
                        type="text" 
                        name = "store_name"
                        id="store_name"  
                        onChange={handleChange}
                        value={state.store_name}
                    />
                    <p className="dim-text">
                        Too lazy to do it. You go enjoy your party. We will take care of it.
                    </p>
                </>
                : 
                null
            }

            {count===2?
                <>
                    <button 
                        className=" fa fa-arrow-left back_button btn"
                        onClick={()=>{
                            count>1? setCount(count-1): setCount(count)
                            }} 
                    ></button>

                    <div className="label mt-3 py-3">
                        <label htmlFor="mobileno">Order List (Optional)</label>
                    </div>

                    <textarea 
                        className="input"
                        type="text" 
                        name = "items"
                        id="items"  
                        onChange={handleChange}
                        value={state.items}
                       
                    />
                    <p className="dim-text" id="dim-text-1">
                        Just tell us what you want. We will get it to you. 
                        Example - Aspirin, Pizza ( You have a party at your place - and you want to take care of your hangover. We got you).
                    </p>

                    <div className="label mt-3 py-3">
                        <label htmlFor="mobileno">Address (Optional)</label>
                    </div>

                    <textarea 
                        className="input"
                        type="text" 
                        name = "address"
                        id="address"  
                        onChange={handleChange}
                        value={state.address}
                       
                    />
                    <p className="dim-text" id="dim-text-1">
                        Put your address if you want to. If not, we will call you and ask for it.
                    </p>

                

                </>
                :
                null
            }


            <div className="mt-5">
                {count!==2?
                    <button  className="btn submit_button" type="button" onClick={()=>{
                        count<2? setCount(count+1): setCount(count)
                    }}>Next</button>:
                    null
                }
                {count===2?
                     <button  className="btn submit_button" type="submit">Ask Valet to Call</button> 
                     :
                     null   
                }
                <img src={marker} alt="" className="marker"/>
            </div>
        
        </form> 
        </>
            
    )
}
