import React from 'react'
import './WhyShopStepCardMobile.scss'
const WhyShopStepCardMobile = (props) => {
    return (
        <div className='steps-card-mobile' style={{ backgroundColor: props.bgcolor }}>
            <img src={props.image} alt="" />
            <p>{props.text}</p>
        </div>
    )
}

export default WhyShopStepCardMobile
