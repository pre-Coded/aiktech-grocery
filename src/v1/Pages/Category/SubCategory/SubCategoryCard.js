import React from 'react'
import './SubCategoryCard.scss';
import defaultImage from '../../../Assets/Images/default-image.png'
import blob from "../../../Assets/Images/category-icon/blob.svg"
const SubCategoryCard = (props) => {
    return (
        <div className={`sub-category-card`} onClick={props.onClick}>

            <div className='sub-category-wrapper'>
                <div className={`sub-category-image-wrapper  ${props.active? 'sub-category-card-active': ''}`}>
                    <img src={props.image ? props.image : defaultImage} alt="404"/>
                </div>
                <div className='category-text sub-category-text'>
                    <h6>{props.title}</h6>
                    {props.number === 0 ? <p>{props.number} products</p> : null}
                </div>
            </div>
            
        </div >
    )
}

export default SubCategoryCard

SubCategoryCard.defaultProps = {
    title: 'Default Title',
    number: '0',
    color: 3
}
