import React, {useState} from "react";


const HoverComponent = ({children, hoverRef, onMouseLeave,onMouseEnter, style}) => {

    const findPosition = () => {
        const element =  hoverRef?.current.getBoundingClientRect();

        const top = element.height;
        const left = element.x - element.width + 10; 

        return {
            top : top,
            left : left
        };
    }

    const [position, setPosition] = useState(findPosition());

    return (
    <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
            padding : `${position.top}px 10px`,
            position: 'absolute',
            right : '0px',
            zIndex : '1000',
            top : '0px',
        }}
    >
        <div style={style}>
        {
            children
        }
        </div>
    </div>
    )
}

export default HoverComponent;