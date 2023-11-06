import './WhyShopCard.scss'
import React from 'react'
import tick from '../../../Assets/Images/why shop with us/icon/tick.svg';

const WhyShopCard = (props) => {
    return (
        <div className='whyshop-card'>
            <img src={props.image} alt="" />
            <div className='whyshop-card-text'>
                <p>{props.text}</p>
            </div>
            <img src={tick} alt="" />

        </div>
    )
}

export default WhyShopCard
