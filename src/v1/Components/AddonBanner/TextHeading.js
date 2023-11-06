import React from 'react'
import './Addonbanner.scss'

export default function TextHeading(props) {
  return (
    <div 
      id={props.id}
      className='addon-text-heading' 
      style={{fontSize: `${props.fontSize}`,fontWeight: `${props.fontWeight}`}}
    >
        {props.heading}
    </div>
  )
}
