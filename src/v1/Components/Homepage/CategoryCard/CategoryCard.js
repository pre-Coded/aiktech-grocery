import React from 'react'
import './CategoryCard.scss';
import defaultImage from '../../../Assets/Images/default-image.png'
import blob from "../../../Assets/Images/category-icon/blob.svg"
const CategoryCard = (props) => {
    return (
        <div className={`category-card card${props.color % 6} ${props.active? ' category-card-active': ''}`} onClick={props.onClick}>
            <img src={blob} alt="" className={'background-blob blob-position' + props.color % 5} />
            <div className='category-content-wrapper'>
                <img src={props.image ? props.image : defaultImage} alt="404" className='category-image' />
                <div className='category-text'>
                    <h6>{props.title}</h6>
                    {props.number === 0 ? <p>{props.number} products</p> : null}
                </div>
            </div>
        </div >
    )
}

export default CategoryCard

CategoryCard.defaultProps = {
    title: 'Default Title',
    number: '0',
    color: 3
}
