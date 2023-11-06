import React from 'react'
import Requestform from '../Requestform/Requestform'
import ExpressForm from '../ExpressForm/ExpressForm'
import Dots from './dots.svg'
import './Request.css'
export default function Request({toggle, re, setRefreshvalue}) {
    return (
        <div className="container mt-5">
            {toggle ?
                <div className="row">
                    <div className="col-md-12 col-12 col-sm-12">
                        <Requestform />
                    </div>
                    
                </div>
                : <ExpressForm re={re} setRefreshvalue={setRefreshvalue} />
                
            }
            <div className="dots">
                <img src={Dots} alt="" />
            </div>
        </div>
    )
}
