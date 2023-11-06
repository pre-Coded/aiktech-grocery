import React from 'react'
import './Addonbanner.scss'

export default function Paragraph(props) {
  return (
    <div 
      className='addon-paragraph' 
      style={{lineHeight: `${props.lineHeight}`}}
    >
       {props.text}
    </div>
  )
}
