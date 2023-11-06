import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { actionsCreator } from '../Redux/actions/actionsCreator';
import {getToken} from '../Utils'

export default function AuthWrapper({ children }) {
    const isLoggedIn = getToken();
    const history = useHistory()
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!isLoggedIn) {
            history.push('/');
            dispatch(actionsCreator.SHOW_LOGIN());
        }
    }, [])

    if (isLoggedIn) {
        return (
            <div>
                {children}
            </div>
        )
    }
    return null;

}
