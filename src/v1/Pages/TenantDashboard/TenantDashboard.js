import React, { useCallback, useRef } from "react";
import './TenantDashboard.scss';
import SideBar, { SideBarComponent } from "../../Components/SideBar/SideBar";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route, Router, Routes } from "react-router";
import Dashboard from "../dashboard/Dashboard.js";
import { useLocation } from "react-router";
import { useState } from "react";
import AddStock from "../AddStock/AddStock.js";
import { useHistory } from 'react-router-dom'
import { dashboardAPI } from "../../Api/index.js";
import { useEffect } from "react";
import { set } from "lodash";

import { LOGOUT_USER } from "../../Redux/actions/actionTypes";

import AddCategory from "../AddContent/AddCategory/AddCategory";
import AddProduct from "../AddContent/AddProdcut/AddProduct";
import AddContent from "../AddContent/AddProdcut/AddProduct";

import HoverComponent from "../../Components/HoverComponent/HoverComponent";

import DummyData from '../../Assets/DummyData.json'

const TenantDashboard = () => {

    const [activeComponent, setActiveComponent] = useState("addProduct")

    const userInfoRef = useRef(null);

    const history = useHistory();
    const [tenant_id, setTenantID] = useState(0);
    console.log(tenant_id);

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);

    // const [products, setProducts] = useState(DummyData.products)
    // const [categories, setCategories] = useState(DummyData.categories);


    // console.log(categories,"cat");

    useEffect(async ()=>{
        const response = await dashboardAPI.fetchTenantProducts();
        setProducts(response.data);
        const res = await dashboardAPI.fetchTenantCategories();
        console.log(res,"response");
        setCategories(res.data)
    },[])

    const handleActiveComponent = useCallback(() => {
        if (activeComponent === 'dashboard') {
            return <Dashboard />
        }
        else if(activeComponent === "addProduct"){
            return products && <AddProduct products={products}/>
        }
        else if(activeComponent === "addCategory"){
            return categories && <AddCategory categories={categories} />
        }
        else if (activeComponent === 'addStock') {
            return <AddStock />
        } else {
            return <></>;
        }
    }, [activeComponent])

    const [userInformation, setUserInformation] = useState(false);
    
    

    return (
        <div className="tenant-dashboard-container overflow-hidden flex-column">

            <div className="tenant-dashboard-nav">
                <span className="dashboard-heading">CMS</span>

                <div
                    onMouseEnter={() => {
                        setUserInformation(true);
                    }}

                    onMouseLeave={() => {
                        setUserInformation(false);
                    }}

                    style={{
                        color: 'white',
                        maxWidth : 'fit-content', 
                        position : 'relative'
                    }}
                >
                    <button
                        className="btn-none"
                        style={{
                            color: 'white',
                            maxWidth: 'fit-content'
                        }}
                        ref={userInfoRef}
                    >
                        Hey, User
                    </button>

                    {
                        userInformation && 
                        <HoverComponent 
                            hoverRef={userInfoRef}
                        >
                            <div className="mobile-sidebar-items">
                                <SideBarComponent  
                                    setActiveComponent={setActiveComponent}
                                    activeComponent={activeComponent}
                                />
                            </div>
                            <button 
                                className="btn-none nowrap"
                                style={{
                                    color : 'black',
                                    letterSpacing : '2px',
                                    padding : '4px'
                                }}

                                onClick={LOGOUT_USER}
                            >
                                Log Out
                            </button>
                        </HoverComponent>
                    }
                </div>
            </div>


            <div className="tenant-dashboard-sidebar-active flex-row flex-1">

                <div className="tenant-dashboard-sidebar reponsive-sidebar">
                    <SideBar
                        setActiveComponent={setActiveComponent}
                        activeComponent={activeComponent}
                    />
                </div>

                <div className="tenant-dashboard-active flex-row flex-1 overflow-hidden" style={{maxHeight : '100%'}}>
                    {
                        handleActiveComponent()
                    }
                </div>
            </div>

        </div>
    )
}

export default TenantDashboard;