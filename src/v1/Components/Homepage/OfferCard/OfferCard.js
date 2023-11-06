import React from "react";
import "./OfferCard.scss";
import { Link } from "react-router-dom";

const OfferCard = (props) => {
  return (
    <div className={"card-wrapper offer-color" + props.color}>
      <div className="left-card">
        <h3>{props.text}</h3>
        {/* <h3>
                    {props.offer}
                </h3> */}
        {/* <Link to={props.link} style={{ textDecoration: 'none' }}>
                    <div className='offer-btn'>
                        <h3>
                            Shop Now
                        </h3>
                    </div>
                </Link> */}
      </div>
      <div className="offer-image-wrapper">
        <img src={props.img} alt="Image Not Found" />
      </div>
    </div>
  );
};

export default OfferCard;
