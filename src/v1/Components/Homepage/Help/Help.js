import React from 'react'
import './Help.scss';
import helpIcon1 from '../../../Assets/Images/help/help1.svg';
import helpIcon2 from '../../../Assets/Images/help/help2.svg';
import helpIcon3 from '../../../Assets/Images/help/help3.svg';

const Help = () => {
    return (
        <div className="help-container">
            <h1 className='none'><strong> How can Phurti help you?</strong></h1>
            <div className='help-wrapper'>
                <div className='help-item'>
                    <img src={helpIcon1} alt="help1" />
                    <div className='help-text'>
                        <p>Binge watching your favorite show? Order chilled beer and much more on Phurti.</p>
                    </div>
                </div>
                <div className='help-item'>
                    <img src={helpIcon2} alt="help2" />
                    <div className='help-text'>
                        <p>Out of smokes in the middle of a party. Oh wait, everyone prefers a different brand. You know what- <br /> we are there.</p>
                    </div>
                </div>
                <div className='help-item'>
                    <img src={helpIcon3} alt="help3" />
                    <div className='help-text'>
                        <p>Want to cook today? Missing out on key ingredients? Can't wait. Let us get it to you in a few minutes.</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Help
