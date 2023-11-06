import React from 'react'
import './WhyShop.scss'
import '../WhyShopCard/WhyShopCard'
import WhyShopCard from '../WhyShopCard/WhyShopCard';
import feature1Icon from '../../../Assets/Images/why shop with us/icon/icon1.svg';
import feature2Icon from '../../../Assets/Images/why shop with us/icon/icon2.svg';
import feature3Icon from '../../../Assets/Images/why shop with us/icon/icon3.svg';
import whyShopImage from '../../../Assets/Images/why shop with us/icon/whyshopbg.png';

import WhyShopBottomContainer from './BottomContainer/WhyShopBottomContainer';

const WhyShop = () => {
    return (
        <>
            <div className='whyshop-wrapper'>
                <div className='whyshop-container'>
                    <div className='whyshop-title'>
                        <p>Showcase</p>
                        <h2>Why should you use our services?</h2>
                        <p>We always provide the best and fastest service for All Our Customers</p>
                    </div>
                    <WhyShopCard
                        text="Doorstep order in just minutes."
                        image={feature1Icon} />
                    <WhyShopCard
                        text="Free Delivery on every order."
                        image={feature2Icon} />
                    <WhyShopCard
                        text="Widest collection of items."
                        image={feature3Icon} />
                </div>
                <div className="whyshop-image-container">
                    <img src={whyShopImage} alt="" className="whyshop-image" />
                </div>
            </div >
            <WhyShopBottomContainer />

        </>
    )
}

export default WhyShop
