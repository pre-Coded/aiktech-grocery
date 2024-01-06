import React, { useCallback, useRef } from "react";
import './TenantDashboard.scss';
import SideBar, { SideBarComponent } from "../../Components/SideBar/SideBar";
import Dashboard from "../dashboard/Dashboard.js";
import { useState } from "react";
import AddStock from "../AddStock/AddStock.js";
import { useHistory } from 'react-router-dom'
import { actionsCreator } from "../../Redux/actions/actionsCreator.js";
import { toast } from "react-toastify";

import AddCategory from "../AddContent/AddCategory/AddCategory";
import AddProduct from "../AddContent/AddProdcut/AddProduct";

import HoverComponent from "../../Components/HoverComponent/HoverComponent";
import { useDispatch } from "react-redux";
import AddUser from "../AddUser/AddUser";

const TenantDashboard = () => {

    const [activeComponent, setActiveComponent] = useState("addCategory");
    const [userInformation, setUserInformation] = useState(false);
    const userInfoRef = useRef(null);
    const history = useHistory();

    const dispatch = useDispatch()
    
    const logout = () => {
        dispatch(actionsCreator.LOGOUT_USER());
        toast.error("User is logged out successfully", {autoClose : 1000});
        history.push('/')
    };

    const handleActiveComponent = useCallback(() => {
        if (activeComponent === 'dashboard') {
            return <Dashboard />
        }
        else if(activeComponent === "addProduct"){
            return <AddProduct />
        }
        else if(activeComponent === "addCategory"){
            return <AddCategory />
        }
        else if (activeComponent === 'addStock') {
            return <AddStock />
        }
        else if (activeComponent === "addUser"){
            return <AddUser />
        } 
        else {
            return <></>;
        }
    }, [activeComponent])
    
    
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
                            style={{
                                backgroundColor : '#f2f2f2', 
                                padding : '4px 0', 
                                width : '8rem',
                                borderRadius : '8px'
                            }}
                        >
                            <div className="mobile-sidebar-items">
                                <SideBarComponent  
                                    setActiveComponent={setActiveComponent}
                                    activeComponent={activeComponent}
                                />
                            </div>
                            <button 
                                className="btn-none nowrap flex-row items-center text-small"
                                onClick={logout}
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