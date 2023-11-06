import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Banner,
  Categories,
  Foryou,
  Navbar,
  Offers,
  Help,
  Bottom,
  Install,
  WhyShop,
  Footer,
  Login,
  Overlay,
  Modal,
} from "../../Components";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import giftIcon from "../../Assets/Images/gifs/gift.gif";
import logo from "../../Assets/Images/navbar/new_logo.svg";
import "./Home.scss";
import { welcomeModalHandler } from "../../Utils";
import Bannerv2 from "../../Components/Homepage/Bannerv2";
import Slideshow from "../../Components/Homepage/Bannerv2/Slideshow";

const mapStateToProps = ({ auth, categories = {} }) => ({
  auth,
  categories,
});

const Home = () => {
  const dispatch = useDispatch();
  const {
    auth,
    categories: { list: categoryList },
  } = useSelector(mapStateToProps);
  const { isLoggedIn } = auth;
  const [offers, setOffers] = useState(true);
  const [subcategory, setSubcategory] = useState([])

  const subcategoryAdd = ()=>{
    let temp_sub_category = []
    categoryList.map((item) => {
      item.sub_categories && item.sub_categories.map((subitem)=>{
        if (subitem.home_page){
          temp_sub_category.push(subitem)
        }
      })
    })
    setSubcategory(temp_sub_category)
  }
  useEffect(() => {
    subcategoryAdd()
  }, [categoryList])
  
  
  const fetchCartDetails = () => {
    dispatch(actionsCreator.FETCH_CART_DETAILS());
  };

  const fetchFavouriteProducts = () => {
    dispatch(actionsCreator.FETCH_FAVOURITE_PRODUCTS());
  };

  // const [modal, setModal] = useState(true);
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartDetails();
      fetchFavouriteProducts();
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const hideModal = welcomeModalHandler();
  //   setModal(!hideModal);
  //   if (!hideModal) {
  //     localStorage.setItem("hideWelcomePopup", "true");
  //   }
  // }, []);

  // const hideWelcomeModal = () => {
  //   setModal(false);
  // };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Banner showButton={isLoggedIn} />
        {isLoggedIn && <Categories />}
        {categoryList && categoryList.length && (categoryList[0].name === "Best Sellers" || categoryList[0].name === "Best Seller") ? null : <Offers />}
        {isLoggedIn && categoryList && categoryList.length > 0
          ? categoryList.map((item, index) => {
            if (item.home_page) {
              return (
                <>
                  <Foryou
                    title={item.name}
                    id={index}
                    pk={item.id}
                  />
                  {item.name === "Best Sellers" ?
                    <Offers />
                    : null}
                </>
              );
            }
          })
          : null}
        {isLoggedIn && subcategory.length>0? 
        subcategory.map((item, index)=>(
          <Foryou title={item.name} id={index} pk={item.id}/>
        )): null}
        {/* <Install /> */}
        <WhyShop />
        {/* <Help /> */}
      </div>
      {/* <Modal show={modal} onClose={hideWelcomeModal}>
        <div className="home-page-modal">
          <div
            className="cross"
            onClick={() => {
              setModal(false);
            }}
          >
            ✕
          </div>
          <img src={logo} alt="" className="modal-logo" />
          <div>
            <img className="modal-image" src={giftIcon} alt="" />
          </div>
          <h5>Phurti is Revamped! Start shopping with us Now!</h5>
        </div>
      </Modal> */}
    </div>
  );
};

export default Home;
