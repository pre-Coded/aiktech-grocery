import React from 'react'
import { Modal } from '..'
import location1 from '../../Assets/Images/gifs/location1.gif'
import location2 from '../../Assets/Images/gifs/location2.gif'
import location3 from '../../Assets/Images/gifs/location3.gif'
import location4 from '../../Assets/Images/gifs/location4.gif'
// import location4 from '../../Assets/Images/gifs/location4.gif'
import './LocationPopUp.scss'
const LocationPopUp = (props) => {
    return (
        <Modal show={props.show} onClose={() => props.onClose(false)}>
            <div className="cross" onClick={() => props.onClose(false)}>
                ✕
            </div>
            <div className='location-popup'>
                <img src={location2} alt="" />
                <h3>
                    Hey! We will need access to your location to deliver your groceries.
                </h3>
            </div>
        </Modal>
    )
}

export default LocationPopUp
