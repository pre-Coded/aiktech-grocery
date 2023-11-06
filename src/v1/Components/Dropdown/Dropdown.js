import React from 'react'
import InputField from '../InputField'
import arrow from '../../Assets/Icons/bottom_arrow.svg';
import './Dropdown.scss'
import { findLabel } from '../../Utils/general-utils';

export default function Dropdown({ placeholder, value, options, onClick }) {
    const selectedLabel = findLabel(options, value);
    return (
        <div className="dropdown-wrapper">
            <InputField value={selectedLabel} placeholder={placeholder} />

            <div className='down-arrow-container'>
                <img src={arrow} alt="" className='dropdown-arrow' />
            </div>
            <div class="dropdown-content">
                {options && options.length > 0
                    ? options.map((item) => { return <p onClick={() => onClick(item.value)} className="item-name">{item.label}</p> })
                    : null}
            </div>
        </div>
    )
}