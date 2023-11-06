import React, { useState, useRef, useEffect } from "react";
import useWindowDimensions from '../../../Hooks/useWindowDimensions'
import './Slideshow.scss'

import d_Offer0 from '../../../Assets/Images/offers/offer1desktop.png'
import m_Offer0 from '../../../Assets/Images/offers/offer1mobile.png'
import t_Offer0 from '../../../Assets/Images/offers/offer1tablet.png'

import dOffer1 from '../../../Assets/Images/offers/offer2desktop.png'
import mOffer1 from '../../../Assets/Images/offers/offer2mobile.png'
import tOffer1 from '../../../Assets/Images/offers/offer2tablet.png'

import dOffer2 from '../../../Assets/Images/offers/offer3desktop.png'
import mOffer2 from '../../../Assets/Images/offers/offer3mobile.png'
import tOffer2 from '../../../Assets/Images/offers/offer3tablet.png'
import { Link } from "react-router-dom";


function Slideshow(props) {

    const { height, width } = useWindowDimensions();
    const [tag, setTag] = useState("desktop_view_image")

    useEffect(() => {
        if (tag !== "desktop_view_image" && width > 780)
            setTag("desktop_view_image")
        else if (tag !== "tablet_view_image" && width <= 780 && width > 500)
            setTag("tablet_view_image")
        else if (tag !== "mobile_view_image" && width <= 500)
            setTag("mobile_view_image")
    }, [width])

    const delay = 4000;
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);


    // useEffect(() => {
    //     console.log(props.images)
    // }, [props.images])

    return (
        <div className="slideshow-wrapper slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {props.images && props.images.map((item, index) => (
                    <div
                        className="slide"
                        key={index}
                    >
                        {
                            item.action_link ?
                                <Link to={item.action_link}>
                                    <img src={item[tag]} alt="" />
                                </Link>
                                :
                                <img src={item[tag]} alt="" />
                        }
                    </div>
                ))}
            </div>

            <div className="slideshowDots">
                {props.images && props.images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Slideshow

// Slideshow.defaultProps = {
//     images: [{
//         desktop_view_image: d_Offer0,
//         tablet_view_image: t_Offer0,
//         mobile_view_image: m_Offer0,
//         action_link: '/'
//     },
//     {
//         desktop_view_image: dOffer1,
//         tablet_view_image: tOffer1,
//         mobile_view_image: mOffer1,
//         action_link: '/'
//     },
//     {
//         desktop_view_image: dOffer2,
//         tablet_view_image: tOffer2,
//         mobile_view_image: mOffer2,
//         action_link: '/'
//     }]
// }
