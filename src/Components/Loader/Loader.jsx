import React from 'react'
import './Loader.css'
export const Loader = ()=>{
    return(
        <div className='loader' id="loader-up">
            <lottie-player id="loader" src="https://assets3.lottiefiles.com/packages/lf20_xcfowedx.json "  background="transparent"  speed="1"  loop  autoplay className="loader-show"></lottie-player>
        </div>
    )
}
export default Loader;
