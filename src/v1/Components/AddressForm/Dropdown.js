import React from "react";
import "./Dropdown.scss";
import { findLabel } from "../../Utils/general-utils";
import { useState } from "react";
import { useEffect } from "react";

export default function Dropdown({ placeholder, value, options, onClick }) {
    const selectedLabel = findLabel(options, value);
    const [optionSelected, setoptionSelected] = useState(null)
    useEffect(() => {
        // console.log(optionSelected)
    }, [optionSelected])
    const nameToValue = (element, array) => {
        var i
        for (i in array) {
            if (array[i].label === element)
                return (array[i].value)
        }
    }


    useEffect(() => {
        onClick(nameToValue(optionSelected, options))
    }, [optionSelected])


    return (
        <div className="dropdown-select">
            {/* <InputField value={selectedLabel} placeholder={placeholder} />

            <div className='down-arrow-container'>
                <img src={arrow} alt="" className='dropdown-arrow' />
            </div>
            <div class="dropdown-content">
                {options && options.length > 0
                    ? options.map((item) => { return <p onClick={() => onClick(item.value)} className="item-name">{item.name}</p> })
                    : null}
            </div> */}
            <select className="dropdown input-container"
                onChange={(e) => { setoptionSelected(e.target.value) }}>
                <option >--Select area--</option>
                {
                    options && options.length > 0
                        ? options.map((item) => {
                            return (
                                item.active?
                                <option
                                    className="item-name"
                                >
                                    {item.label}
                                </option>
                                :null
                            );
                        })
                        : null
                }
            </select >
        </div >
    );
}
