import React from 'react'
import './Addonbanner.scss'

export default function Addonbanner(props) {
  return (
    <div className="addonbanner" >
        <div className="addonbanner-text">
            <h2>
               {props.heading}
            </h2>
            <p>{props.smallheading}</p>
            <br />
        </div>
    </div>
  )
}
