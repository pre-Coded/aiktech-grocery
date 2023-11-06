import React from 'react'
import './Install.scss';
import vegies from '../../../Assets/Images/install purti app/vegetables.png';
import phoneIcon from '../../../Assets/Images/iphone.png';
import playStoreIcon from '../../../Assets/Images/playstore.png';
import appStoreIcon from '../../../Assets/Images/appstore.png';
const Install = () => {
    return (
        <div className='install-wrapper'>
            <img className='install-phone' src={phoneIcon} alt="" />
            <div>
                <div className='install-text'>
                    <h3>Install Phurti App</h3>
                    <p>It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of delectable food.</p>
                </div>
                <div className='installation-image'>
                    {/* <img src={playStoreIcon} alt="" /> */}
                    {/* <img src={appStoreIcon} alt="" /> */}
                </div>
            </div>
            <img className='corner-image' src={vegies} alt="" />
        </div>
    )
}

export default Install
