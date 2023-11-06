import React from 'react'
import { Link } from 'react-router-dom'
import './Tab.scss'

const Tab = (props) => {
    return (
        <div
            onClick={() => props.categoryRequest(props.text)}
            className={`tab tab-color ${props.active ? 'active' : ''}`} >
            <p>
                {props.text}
            </p>
        </div >
    )
}

export default Tab

Tab.defaultProps = {
}
