import React from "react";
import './SideBar.scss'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import { useHistory } from "react-router-dom";

const SideBar=({setOption,option})=>{
    const dispatch = useDispatch();
    const history=useHistory();

    const logout = () => {
        dispatch(actionsCreator.LOGOUT_USER());
        toast.error("User is logged out successfully");
        history.push('/'); 
      };

    return(


        
        <div className="sidebar"> 
        
        <ul>
            <li className="options-parent">
                <button style={option===1?{"backgroundColor":"white","color":"black"}:{}} onClick={()=>{setOption(1)}}>Dashboard</button>
            </li>
            <li className="options-parent" onClick={()=>(setOption(2))}>
               <button style={option===2?{"backgroundColor":"white","color":"black"}:{}}>Add Stock</button> 
                </li>
            <li className="options-parent"> 
            <button onClick={logout}>Logout</button>
            </li>
        </ul>
        
    </div>

    )
}

export default SideBar;