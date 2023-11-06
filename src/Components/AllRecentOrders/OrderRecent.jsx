import React, { useState, useEffect } from 'react'
import { all_orders } from '../../api/request.api'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
// import './Order.css'
import '../../Components/ExpressForm/ExpressForm.css'
import Orderlist from '../Order/Orderlist'
import ping from '../Order/ping.wav'

export default function AllRecentOrders() {
    const [order, setOrder] = useState([])
    const [pageCount, setPageCount] = useState(0)
    // const [time, setTime] = useState(1000)
    const [play, setPlay] = useState(false)
    const [audio] = useState(new Audio(ping));
    useEffect(() => {
        // set pooling 
        axios({
            url: `${all_orders}0/`,
            method: 'GET',
           
          })
          .then((res) => {
            if (res.data.status === 404) {
                console.log(res.data)
            } else {
                
                setPageCount(res.data.total_pages)
                setOrder(res.data.results)
                let orders = JSON.parse(localStorage.getItem("orders"))
                if (orders.length===0){
                    res.data.results.map((i, index)=>{
                        orders.push({order: i.id, read: 0})
                        localStorage.setItem("orders", JSON.stringify(orders))
                        return 0
                    })
                }
                else{
                    let newValue = [];
                    res.data.results.map((i, index)=>{
                        newValue.push({order: i.id, read: 0})
                        return 0
                    })
                    const results = newValue.filter(({ order: id1 }) => !orders.some(({ order: id2 }) => {
                        return id2 === id1
                    }));
                    orders = [...orders, ...results]
                    localStorage.setItem("orders", JSON.stringify(orders))
                    if (results.length>0){
                        setPlay(true)
                    }
                    else{
                        setPlay(false)
                    }
                    
                }
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    if (play){
        audio.play() 
    }
    const handlePageClick= (e)=>{
        axios({
            url: `${all_orders}0/?page=${e.selected+1}`,
            method: 'GET',
            
          })
          .then((res) => {
            if (res.data.status === 404) {
                console.log(res.data)
            } else {
                setPageCount(res.data.total_pages)
                setOrder(res.data.results)
                let orders = JSON.parse(localStorage.getItem("orders"))
                if (orders.length===0){
                    res.data.results.map((i, index)=>{
                        orders.push({order: i.id, read: 0})
                        localStorage.setItem("orders", JSON.stringify(orders))
                        return 0
                    })
                }
                else{
                    let newValue = [];
                    res.data.results.map((i, index)=>{
                        newValue.push({order: i.id, read: 0})
                        return 0
                    })
                    const results = newValue.filter(({ order: id1 }) => !orders.some(({ order: id2 }) => {
                        return id2 === id1
                    }));
                    orders = [...orders, ...results]
                    localStorage.setItem("orders", JSON.stringify(orders))
                    
                }
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }
    return (
        <div className="container">
            
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-4 ">
                    <h4>Order List:</h4>
                    <div className="b-top w-100"></div>
                </div>
                
                    {
                        order.map((i, index)=>(
                            <Orderlist 
                                key={index}
                                data = {i}
                            />
                        ))
                    }
            </div>
            
            <div className="b-top w-100 mt-4"></div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-4">
                    <ReactPaginate
                        previousLabel={" ← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex-wrap justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link radius mx-1 mt-1"}
                        previousLinkClassName={"page-link radius mx-1 mt-1 mx-2 border-0"}
                        nextLinkClassName={"page-link radius mx-1 mt-1 mx-2 border-0"}
                        breakClassName={"page-link radius mx-1 mt-1"}
                        activeClassName={"active"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div>
            <div className="b-top w-100"></div>
        </div>
    )
}
