import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import Auth from "../Auth/Auth";
import "./Navbar.scss";

import logoImg from "../../Assets/Images/navbar/new_logo.svg";
// import logoImg from "../../Assets/Images/navbar/blue_logo.png";
import searchIcon from "../../Assets/Images/navbar/search.svg";
import everythingIcon from "../../Assets/Images/navbar/blue-icon.svg";
import favouriteIcon from "../../Assets/Images/navbar/favourites.svg";
import loginIcon from "../../Assets/Images/navbar/login.svg";
import basketIcon from "../../Assets/Images/navbar/basket.svg";
import walletIcon from "../../Assets/Images/navbar/wallet.png";
import { toast } from "react-toastify";
// import useOutsideAlerter from '../../Hooks/useOutsideAlerter'
import { debounce, formatName } from "../../Utils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { cartAPI, authAPI } from "../../Api";

const mapStateToProps = ({ cart, auth, payment }) => ({
  cart,
  auth,
  payment,
});
const Navbar = (props) => {
  const { cart, auth, payment} = useSelector(mapStateToProps);
  const { showLoginPopup = false, isLoggedIn, userDetails = {} } = auth;
  useEffect(() => {
    if (showLoginPopup === true) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [showLoginPopup]);
  const {walletBalance = 0,isWallet = false} = payment;
  const [searchterm, setsearchterm] = useState(""); //text within searchbox
  const [showsearch, setshowsearch] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const [company, setCompany] = useState([]) //company Details

  // const debounce = (fn, delay) => {   //debounce for text search
  //     let timeoutID;
  //     return function (...args) {

  //         if (timeoutID) {
  //             clearTimeout(timeoutID)
  //         }
  //         timeoutID = setTimeout(() => {
  //             fn(...args)
  //         }, delay)
  //     }
  // }

  useEffect(() => {
    props.search(searchterm);
  }, [searchterm]);

  const logout = () => {
    dispatch(actionsCreator.LOGOUT_USER());
    toast.error("User is logged out successfully");
    setOpenProfile(false);
  };

  const walletFetcher = async () => {
    try {
      let res = await cartAPI.getWalletData();
      dispatch(actionsCreator.UPDATE_WALLET({walletBalance:res.data.data.balance,isWallet : true}));
    } catch (error) {
      dispatch(actionsCreator.UPDATE_WALLET({isWallet : false}));
      console.log(error);
    }
  };
  
  // const companyFetcher = async () => {
  //   try {
  //     let res = await authAPI.company();
  //     setCompany(res.data);
  //   } catch (error) {
  //     console.log("ERROR in Company API", error)
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn) walletFetcher();
  }, [isLoggedIn]);

  // useEffect(() => {
  //   companyFetcher();
  // }, [])
  

  const { name = "", email = "" } = userDetails || {};
  const formattedName = formatName(name);
  const { final_item = 0, final_price = 0 } = cart || {};

  function useOutsideAlerter(ref, key, loginRef) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (
            key === "login" &&
            loginRef.current &&
            !loginRef.current.contains(event.target)
          )
            props.removeLoginPopup();
          else setOpenProfile(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const clickOutsideProfile = useRef();
  const clickOutsideLogin = useRef();
  const loginMenuBtn = useRef();
  useOutsideAlerter(clickOutsideProfile, "profile");
  useOutsideAlerter(clickOutsideLogin, "login", loginMenuBtn);

  return (
    <nav className="navbar">
      {/* <div className='top-container'>
                <ul>
                    <li><a href='/'>About Us</a></li>
                    <p>|</p>
                    <li><a href='/'>My Account</a></li>
                    <p>|</p>
                    <li><a href='/'>Contact</a></li>
                </ul>
                <ul>
                    <li><a href="/">Hours:Open 24 hours
                    </a></li>
                    <li><a rel="noreferrer" target="_blank" href='https://www.facebook.com/'><img className='social' src={fbIcon} alt="" /></a></li>
                    <li><a rel="noreferrer" target="_blank" href='https://www.instagram.com/'><img className='social' src={instaIcon} alt="" /></a></li>
                    <li><a rel="noreferrer" target="_blank" href='https://www.linkedin.com/'><img className='social' src={linkedinIcon} alt="" /></a></li>
                </ul>

            </div> */}

      <div className="bottom-container">
        <Link to="/">
            <div className="Logo">
                <img src={logoImg} alt="Logo" />
              </div>
          
        </Link>
        {/* <div className='location '>
                    <img src={locationIcon} alt="" />
                    <h3>{props.location}</h3>
                </div> */}

        {isLoggedIn && (
          <input
            type="text"
            placeholder="Search For Products...."
            className={"navbar-search " + showsearch}
            style={{ backgroundImage: `url(${searchIcon})` }}
            onChange={debounce((event) => {
              props.search(event.target.value);
            }, 400)}
          />
        )}

        <div className={`item-wrap ${isLoggedIn ? "logged-in" : ""}`}>
          {/* <div className='navbar-items search-icon'
                        onClick={() => { setshowsearch(' .show-search-bar') }}
                    >
                        <img src="/v1/phurti-images/navbar/search.svg" alt="" />
                    </div> */}
          {isLoggedIn && (
            <Link to="/everythingdelivery">
              <div className="navbar-items ">
                <img src={everythingIcon} alt="" className="icon-highlight" />
                <span className="category-highlight">Make your own List</span>
              </div>
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <Link to="/wishlist" className="navbar-favorite">
                <div className="navbar-items navbar-favorite">
                  <img src={favouriteIcon} alt="" />
                  <p className="favorite">Favourite</p>
                </div>
              </Link>
              <div className="menu-container" ref={clickOutsideProfile}>
                <div
                  className="navbar-items"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img src={loginIcon} alt="" />
                  <p className="navbar-login">Hey, {formattedName}!</p>
                </div>
                <div className={`menu-list ${openProfile ? "active" : ""}`}>
                  <Link to="/myorders" onClick={() => setOpenProfile(false)}>
                    <div className="menu-item">Recent Orders</div>
                  </Link>
                  <Link to="/wishlist" onClick={() => setOpenProfile(false)}>
                    <div className="menu-item favorite-menu">Favorites</div>
                  </Link>
                  <Link to="/">
                    <div className="menu-item" onClick={logout}>
                      Logout
                    </div>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div
              className="navbar-items"
              onClick={() => {
                props.clickfunc();
              }}
              ref={loginMenuBtn}
            >
              <img src={loginIcon} alt="" />
              <p className="navbar-login">Login/Signup</p>
            </div>
          )}
          {showLoginPopup ? (
            <div
              className={
                isLoggedIn
                  ? "navbar-login-window login_position_set"
                  : "navbar-login-window"
              }
              ref={clickOutsideLogin}
            >
              <Auth />
            </div>
          ) : (
            false
          )}

          {isLoggedIn && (
            <Link to="/checkout">
              <div className="navbar-items shopping-cart">
                <div className="basket">
                  {final_item ? (
                    <span className="cart_count">{final_item}</span>
                  ) : null}

                  <img src={basketIcon} alt="" />
                  <p>
                    <span className="ruppe">₹</span> {final_price}
                  </p>
                </div>
                {isWallet && parseFloat(walletBalance) >= 0 && (
                  <div className="wallet-image wallet basket">
                    <img src={walletIcon} alt="" />
                    <p>
                      <span className="ruppe">₹{parseFloat(walletBalance)}</span>
                    </p>
                  </div>
                )}
              </div>
            </Link>
          )}
          {/* <div className='navbar-items shopping-cart-mini' >
                        <img src="/v1/phurti-images/navbar/basket-mini.svg" alt="aa" className='show-in-mobile' />
                    </div>
                    <div className='navbar-items shopping-cart-mini' >
                        <img src="/v1/phurti-images/navbar/basket-mini.svg" alt="aa" className='show-in-mobile' />
                    </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.defaultProps = {
  location: "Whitefield",
  total_cost: 0,
};
