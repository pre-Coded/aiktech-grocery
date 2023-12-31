import React, {useState} from "react";


const HoverComponent = ({children, hoverRef, onMouseLeave,onMouseEnter, height, width}) => {

    console.log("ref",hoverRef);

    const findPosition = () => {
        const element =  hoverRef?.current.getBoundingClientRect();

        const top = element.height;
        const left = element.x - element.width + 10;

        console.log(element)

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
            maxWidth: '10rem',
            // minHeight: '5rem',
            backgroundColor : '#f2f2f2',
            borderRadius : '5px',
            padding : '4px',
            position: 'absolute',
            top: `${position.top}px`,
            right : '0px',
            fontSize : '0.8rem', 
            zIndex : '1000'
        }}
    >
        {
            children
        }
    </div>
    )
}

export default HoverComponent;