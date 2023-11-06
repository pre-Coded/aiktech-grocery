import React, { useState, useEffect } from 'react'
import { all_orders } from '../../api/request.api'
import axios from 'axios'
import './Order.scss'
import Orderlist from './Orderlist'
import ping from './ping.wav'
import { WEBSITE } from '../../v1/Utils'

export default function Order() {
    const [order, setOrder] = useState([])
    // const [pageCount, setPageCount] = useState(0)
    const [time, setTime] = useState(1000)
    const [play, setPlay] = useState(false)
    const [audio] = useState(new Audio(ping));
    const [lastid, setLastid] = useState(0);
    if (play) {
        audio.play()
        console.log("PLAY.......")
    }
    useEffect(() => {
        // set pooling 
        const interval = setInterval(() => {
            axios({
                url: `${all_orders}${lastid}/`,
                method: 'GET',

            })
                .then((res) => {
                    if (res.data.status === 404) {
                        console.log(res.data)
                    } else {
                        if (time === 1000) {
                            setTime(5000);
                        }

                        // setPageCount(res.data.total_pages)
                        if (res.data.results.length !== 0) {
                            setOrder(res.data.results)
                        }

                        let orders = JSON.parse(localStorage.getItem("orders"))
                        if (orders.length === 0) {
                            res.data.results.map((i, index) => {
                                orders.push({ order: i.id, read: 0 })
                                localStorage.setItem("orders", JSON.stringify(orders))
                                if (index === 0) {
                                    setLastid(i.id)
                                }
                                return 0
                            })
                        }
                        else {
                            let newValue = [];
                            res.data.results.map((i, index) => {
                                newValue.push({ order: i.id, read: 0 })
                                if (index === 0) {
                                    setLastid(i.id)
                                }
                                return 0
                            })
                            const results = newValue.filter(({ order: id1 }) => !orders.some(({ order: id2 }) => {
                                return id2 === id1
                            }));
                            if (results.length > 0) {
                                res.data.results[0].source === WEBSITE ? setPlay(true) : setPlay(false)

                            }
                            else {
                                setPlay(false)
                            }
                            orders = [...orders, ...results]
                            localStorage.setItem("orders", JSON.stringify(orders))


                        }
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }, time);
        // cleanup
        return () => clearInterval(interval);
    }, [time, lastid])
    return (
        <div className="container">

            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-4 ">
                    <h4>Order List:</h4>
                    <div className="b-top w-100"></div>
                </div>

                {
                    order.map((i, index) => (
                        <Orderlist
                            key={index}
                            data={i}
                        />
                    ))
                }
            </div>

            <div className="b-top w-100 mt-4"></div>

        </div>
    )
}
