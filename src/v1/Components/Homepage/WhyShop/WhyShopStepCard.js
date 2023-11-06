import React from 'react'
import "./WhyShopStepCard.scss"
const WhyShopStepCard = (props) => {
    return (
        <div className='steps-card'>
            {props.number % 2 ? null : <br />}
            <img src={props.image} alt="" />
            <div className="steps-text">
                <h2>0{props.number}</h2>
                <p>{props.text}</p>
            </div>
            {props.number % 2 ? <br /> : null}
        </div>
    )
}

export default WhyShopStepCard
