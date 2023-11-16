import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route, Router, Routes } from "react-router";
import Dashboard from "../dashboard/Dashboard.js";
import { useLocation } from "react-router";
import { useState } from "react";
import AddStock from "../AddStock/AddStock.js";
import './TenantDashboard.scss';
import { useHistory } from 'react-router-dom'
import { dashboardAPI } from "../../Api/index.js";
import { useEffect } from "react";


const TenantDashboard=()=>{
    const [option,setOption]=useState(1);
    const history=useHistory();
    const [tenant_id,setTenantID]=useState(0);
    console.log(tenant_id);
    function getTenantID(){
        const promise=dashboardAPI.fetchTenantID();
        console.log("response");
        promise.then((response)=>{
            console.log(response.data.tenant_id);
            setTenantID(response.data.tenant_id);

        }).catch((err)=>{
            console.error(err.message)
        })
        

    }
    useEffect(()=>{
        getTenantID()
        
    },[])
   
    

    return(
        <div className="tenant-dashboard-main">
            <div className="tenant-dashboard-sidebar">
            <SideBar setOption={setOption} option={option}/>

            </div>
            
            <div className="tenant-dashboard-addstock">
            {
                option===1?(<Dashboard/>):(
                    option===2?(
                    <AddStock id={tenant_id}/>
                    ):(<div>

                    </div>)
                )
            }
            </div>
            

            

        </div>
    )
}

export default TenantDashboard;