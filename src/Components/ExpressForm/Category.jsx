import React, { useState, useEffect } from 'react'
import {categoryList} from '../../api/request.api'
import axios from 'axios'
export default function Category({cat}) {
    const [categorylist, setCategorylist] = useState([])
    //<---------------------For getting category whenever component loads------------------------------->
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
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    return (
        <div className="row">
            <div className="col-md-12 col-sm-12 col-12 p-2 col-lg-12 ms-1">
                
                {categorylist? categorylist.map((i, index)=>
                { 
                    return(
                    <span key={index}>
                    <button 
                        className={`btn btn-outline-light filter-button mb-2 ${cat===i.name?"active": ""}`}
                        value={i.name}
                        onClick={()=>{
                            document.getElementById("product-container").style.display="block"
                            document.getElementById("search-product-container").style.display="none"
                        }}
                    >
                        {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                        {/* {} */}
                    </button>      
                    <span className="p-2"></span>
                    </span>
                )})
                : null}
                
               
            </div>
        </div>
    )
}
