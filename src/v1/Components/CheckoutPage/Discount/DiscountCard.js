import React from 'react'
import './DiscountCard.scss';
import close from '../CheckoutProduct/close.svg';
const DiscountCard = (props) => {
    const active = props.discountCode && props.discountCode === props.code;
    return (

        <div className={active ? 'discount-card discount-highlight' : `discount-card ${!props.loading ? "" : "discount-opacity"}`} onClick={() => {
            if (!props.loading) {
                props.clickFunc(props.code)
            }

        }}>
            {
                active &&
                <div className="close-icon" onClick={(e) => props.removeDiscount(e, props.code)}>
                    <img src={close} alt="Close" />
                </div>
            }
            <div className='discount-icon'>
                <div className="discount-star"><p>{props.type === 'A' ? <span className="ruppe">₹</span> : null}{parseFloat(props.title)}{props.type === 'P' ? '%' : null}</p></div>
                <div className="discount-star"><p>{props.type === 'A' ? <span className="ruppe">₹</span> : null}{parseFloat(props.title)}{props.type === 'P' ? '%' : null}</p></div>
            </div>


            <h6>
                {active && props.loading ?
                    <div className="discount-loader"></div> :
                    props.code
                }

            </h6>
        </div>
    )
}

export default DiscountCard
