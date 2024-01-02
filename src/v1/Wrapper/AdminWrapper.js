import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionsCreator } from '../Redux/actions/actionsCreator';
import {getToken} from '../Utils'
import { checkAdmin } from '../Api/authAPI';


export default function AdminWrapper({ children }) {
    const isLoggedin = getToken();
    const history = useHistory()
    const dispatch = useDispatch();
    
    
    useEffect( () => {
        if(isLoggedin){
            const response =  checkAdmin();
            response.then((res)=>{
                console.log(res,"result");
            }).catch((err)=>{
                history.push('/');
        })
        }

        if (!isLoggedin) {
            
            dispatch(actionsCreator.SHOW_LOGIN());
        }
    }, [])

    if (isLoggedin) {
        return (
            <div>
                {children}
            </div>
        )
    }
    return null;

}
