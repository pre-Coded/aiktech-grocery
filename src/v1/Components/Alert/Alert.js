import React, { useState, useEffect } from 'react'
import './Alert.scss'
import { authAPI } from "../../Api";
import get from "lodash/get";


export default function Alert() {
  const [alert, setAlert] = useState({})
  const [userinventory, setUserinventory] = useState({})
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(true)

  const fetchUserDetails = async () => {
    const res = await authAPI.fetchUserDetails();
    const user_inventory = get(res.data, "data");
    const inventory_alert = get(res.data, "inventory_status")
    setUserinventory(user_inventory.inventory)
    setAlert(inventory_alert)
  };
  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(() => {
    checkAlert()
  }, [alert])
  
  const checkAlert = ()=>{
    if (alert && userinventory && (alert.inventory_id==userinventory.id || alert.inventory_name==userinventory.name || alert.inventory_code==userinventory.code)){
      setMessage(alert.message)
    }
    else if (alert && userinventory && (alert.inventory_id==null || alert.inventory_name=="All" || alert.inventory_code=="All")){
      setMessage(alert.message)
    }
  }
  
  return (
    show && message && message.length>0? 
    <div className='alert-message '>
      <div className='alert-text'>{message}</div>
      <span className='alert-cross' onClick={()=> setShow(false)}>x</span>
    </div>: null
    
  )
}
