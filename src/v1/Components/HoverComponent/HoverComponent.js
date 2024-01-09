import React, {useState} from "react";


const HoverComponent = ({children, hoverRef, onMouseLeave,onMouseEnter,onClick,  style}) => {


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
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
            ...style,
            top : `${position.top}px`,
            // padding : '0 10px',
            position: 'absolute',
            right : '0px',
            zIndex : '1000',
        }}
    >
        {
            children
        }
    </div>
    )
}

export default HoverComponent;