import React from "react";
import "./Banner.scss";
import backImg from "../../../Assets/Images/banner/background.svg";
import playStoreIcon from "../../../Assets/Images/playstore.png";
import appStoreIcon from "../../../Assets/Images/appstore.png";
import deliveryManImg from "../../../Assets/Images/banner/banner_girl.png";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreator } from "../../..//Redux/actions/actionsCreator";
import discountIMG from "../../../Assets/Images/banner/discountIMG.png";
import blob1 from "../../../Assets/Images/banner/blob1.svg"
import blob2 from "../../../Assets/Images/banner/blob2.svg"
import useWindowDimensions from "../../../Hooks/useWindowDimensions";

const mapStateToProps = ({ isLoggedIn, auth }) => ({
  isLoggedIn,
  auth,
});

const Banner = (props) => {
  const { height, width } = useWindowDimensions();
  const { auth } = useSelector(mapStateToProps);
  const { showLoginPopup, isLoggedIn } = auth;
  const dispatch = useDispatch();
  const loginstatesetter = () => {
    dispatch(actionsCreator.SHOW_LOGIN());
  };
  return (
    <div className="banner-giga-wrapper">
      <div className="banner" >
        <img src={blob1} alt="" className="blob1" />
        <img src={blob2} alt="" className="blob2" />
        <div className="banner-text">
          <h2 className="banner-head">
            Get Groceries Delivered In Just Minutes.
          </h2>
          <p>Free Delivery on every through website</p>
          <br />
          {!props.showButton && (
            <Button
              text="Continue Shopping"
              bgcolor="white"
              textcolor="#748af9"
              clicker={loginstatesetter}
            />
          )}
          <div className="install-image">
            {/* <img src={playStoreIcon} alt="" /> */}
            {/* <img src={appStoreIcon} alt="" /> */}
          </div>
        </div>

        <img src={deliveryManImg} alt="404NotFound" className="banner-image" />
      </div>
      {!isLoggedIn && (
        <div className="banner-discount">
          <img src={discountIMG} />
          <div className="banner-discount-text">
            <div>
              <h3>Want it, You got it!</h3>
              <p>
                Get Flat <span>50%</span> Discount Upto <span>₹100</span> on
                Your First Order!
              </p>
              <div className="hide_in_normal_view button_container">
                <Button text="Shop Now" clicker={loginstatesetter} />
              </div>
            </div>
          </div>
          <div className="hide_button_in_mobile button_container">
            <Button text="Shop Now" clicker={loginstatesetter} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;

Banner.defaultProps = {};
