import React, { useEffect, useState } from 'react'
import CategoryCard from '../CategoryCard/CategoryCard'
import axios from 'axios'
import './Categories.scss'
import { useHistory } from 'react-router-dom'
import { productAPI } from '../../../Api'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreator } from '../../../Redux/actions/actionsCreator'
import Leftarrow from '../../../Assets/Icons/left-arrow.svg'
import Rightarrow from '../../../Assets/Icons/right-arrow.svg'

const mapStateToProps = ({
    categories = {}
}) => ({
    categories
});

const Categories = () => {
    const {
        categories: { list: categoryList }
    } = useSelector(mapStateToProps);
    const history = useHistory();
    const dispatch = useDispatch();
    const fetchCategories = async () => {
        dispatch(actionsCreator.FETCH_CATEGORIES());
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const selectCategory = (name) => {
        history.push(`/categories/${name}`)
    }

    const findScrollVal = (direction, scrollVal, scrollWidth) => {
        let val = 0;
        if (scrollVal <= scrollWidth) {
            val = direction === "forward" ? scrollVal + 100 : scrollVal - 100;
        } else {
            val = scrollWidth;
        }
        return val < 0 ? 0 : val;
    };

    const scroll = () => {
        const buttonRight = document.getElementById('slideRight');
        const buttonLeft = document.getElementById('slideLeft');

        buttonRight.onclick = function () {
            document.getElementById('scrollDiv').scrollLeft += 120;
            console.log("SCROLL RIght")
        };
        buttonLeft.onclick = function () {
            document.getElementById('scrollDiv').scrollLeft -= 120;
            console.log("SCROLL left")
        };
    };

    return (
        <div className='category-wrapper'>
            <h3>Product Categories</h3 >
            <div className="category-container" id="scrollDiv">
                {categoryList
                    ? categoryList.map((item, index) => {
                        return <CategoryCard
                            title={item.name}
                            key={item.name}
                            image={item.image}
                            onClick={() => selectCategory(item.name)}
                            color={(index)} />
                    })
                    : null}
            </div>
        </div >
    )
}

export default Categories
