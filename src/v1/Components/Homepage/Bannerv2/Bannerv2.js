import React from 'react'
import './Bannerv2.scss'
import Slideshow from './Slideshow'
const Bannerv2 = (props) => {

    return (
        <div className='bannerv2'>
            <Slideshow image={props.data} />
        </div>
    )
}

export default Bannerv2
