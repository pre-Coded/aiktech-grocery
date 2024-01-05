import React, { useEffect, useRef, useState } from "react";
import './SideBar.scss'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import { useHistory } from "react-router-dom";

import { MdOutlineDashboard, MdOutlineProductionQuantityLimits, MdCategory } from "react-icons/md";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const DropDownModel = ({ setActiveComponent, activeComponent }) => {
    return (
        <div className="flex-column gap-10">
            <button 
                className="btn-none" style={{
                    display: 'flex',
                    paddingLeft: 'calc(3.5rem)',
                    fontSize: activeComponent === "addProduct" ? '1rem' : '0.9rem',
                    fontWeight: activeComponent === "addProduct" ? '400' : '300'
                }}

                onClick={() => {
                    setActiveComponent("addProduct")
                }}
            >
                Add Product
            </button>
            <button 
                className="btn-none" style={{
                    display: 'flex',
                    paddingLeft: 'calc(3.5rem)',
                    fontSize: activeComponent === "addCategory" ? '1rem' : '0.9rem',
                    fontWeight: activeComponent === "addCategory" ? '400' : '300'
                }}

                onClick={() => {
                    setActiveComponent("addCategory")
                }}
            
            >
                Add Category
            </button>
        </div>
    )
}


const SideBarComponent = ({ setActiveComponent, activeComponent }) => {

    const [top, setTop] = useState(0);

    const dashboard = useRef(null);
    const addStock = useRef(null);
    const addContent = useRef(null);

    const setActiveLiPosition = () => {
        const firstElement = dashboard?.current.getBoundingClientRect().top;

        console.log(activeComponent);

        if (activeComponent === "dashboard") {
            setTop(dashboard?.current.getBoundingClientRect().top - firstElement);
        } else if (activeComponent === "addStock") {
            setTop(addStock?.current.getBoundingClientRect().top - firstElement);
        } else if (activeComponent === "addProduct" || activeComponent === "addCategory") {
            setTop(addContent?.current.getBoundingClientRect().top - firstElement);
        }

    }

    useEffect(() => {
        setActiveLiPosition();
    }, [activeComponent])

    const [showDropDownModel, toggleDropDownModal] = useState(false)

    return (
        <ul
            className="ul-style-none flex-column sidebar-ul"
            style={{
                margin: 0,
                padding: 0,
            }}
        >
            <li
                className="active-bar"
                style={{
                    top: `${top}px`,
                }}
            />

            <li
                className=""
                ref={dashboard}
            >
                <button
                    onClick={() => { setActiveComponent("dashboard") }}
                    className={`btn-none flex-row gap-10 ${activeComponent === "dashboard" && 'active-li'}`}
                >

                    <MdOutlineDashboard style={{ maxWidth: '2rem', }} className="hide-on-sm" />
                    <span style={{ justifyContent: 'flex-start', display: 'flex' }}>Dashboard</span>
                </button>
            </li>

            <li
                className=""
                ref={addContent}
            >
                <div
                    className={`flex-column gap-10 ${(activeComponent === "addProduct" || activeComponent === "addCategory") && 'active-li'}`}
                    style={{ cursor: 'pointer' }}
                >
                    <button 
                        onClick={() => {
                            toggleDropDownModal(prev => !prev)
                        }}
                        className="btn-none flex-row gap-10"
                    >
                        <MdCategory style={{ maxWidth: '2rem', }} className="hide-on-sm" />
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            Add Content
                            {
                                !showDropDownModel ? 
                                <FaCaretDown style={{ maxWidth: '2rem', }} /> : 
                                <FaCaretUp style={{ maxWidth: '2rem', }} />
                            }
                        </span>
                    </button>

                    {
                        showDropDownModel && <DropDownModel setActiveComponent={setActiveComponent} activeComponent={activeComponent}/>
                    }
                </div>
            </li>

            <li
                className=""
                ref={addStock}
            >
                <button
                    onClick={() => (setActiveComponent("addStock"))}
                    className={`btn-none flex-row gap-10 ${activeComponent === "addStock" && 'active-li'}`}
                >
                    <MdOutlineProductionQuantityLimits style={{ maxWidth: '2rem', }} className="hide-on-sm" />
                    <span style={{ justifyContent: 'flex-start', display: 'flex' }}>Add Stock</span>
                </button>
            </li>

        </ul>
    )
}

const SideBar = ({ setActiveComponent, activeComponent }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="sidebar-component">
            <SideBarComponent
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
            />
        </div>

    )
}

export {
    SideBarComponent
};

export default SideBar;