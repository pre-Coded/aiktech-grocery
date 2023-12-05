import React, { useState, useEffect } from "react";
import "./ProductCard.scss";
import { AddToCartButton } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { findFavouriteItem } from "../../Utils";
import { productAPI } from "../../Api";
import { toast } from "react-toastify";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import defaultImage from "../../Assets/Images/default-image.png";
import Modal from "../Modal";
import Tooltip from "./Tooltip";

const mapStateToProps = ({ favouriteProducts, auth }) => ({
  favouriteProducts,
  auth,
});

const ProductCard = (props) => {
  const { favouriteProducts, auth } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  let price = parseFloat(props.price);
  const { products = [] } = favouriteProducts;
  const { isLoggedIn } = auth;

  const updateFavouriteProduct = async (value) => {
    try {
      const payload = {
        product_id: props.id,
      };
      if (value) {
        // remove from favourite
        const res = await productAPI.deleteFavouriteProduct(payload);
        toast.success("Product is removed from your wishlist");
        fetchFavouriteProducts();
      } else {
        // add in favourite
        const res = await productAPI.addFavouriteProduct(payload);
        toast.success("Product is added in your wishlist");
        fetchFavouriteProducts();
      }
    } catch (error) {
      toast.success("Error while updating wishlist");
    }
  };

  const fetchFavouriteProducts = () => {
    dispatch(actionsCreator.FETCH_FAVOURITE_PRODUCTS());
  };

  const isFavourite = findFavouriteItem(props.id, products);

  const [viewProduct, setviewProduct] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
  })
  const [modal, setModal] = useState(false);
  const outOfStock = props.quantity_remaining <= 0;
  return (
    <div
      className={
        outOfStock && !modal ? "product-wrapper fade-card" : "product-wrapper"
      }
    >
      <Modal show={modal} onClose={() => setModal(false)}>
        <div className="image-viwer">
          <div className="cross" onClick={() => setModal(false)}>
            ✕
          </div>
          <img src={viewProduct.image} alt="" />
          <div>
            <h3>{viewProduct.title}</h3>
            <p>{viewProduct.description}</p>
            <h4>₹{parseFloat(viewProduct.price)}</h4>
          </div>
        </div>
      </Modal>
      {isLoggedIn && (
        <div className="add-to-favorite-icon">
          <div
            className={!isFavourite ? "heart-grey" : "heart-red"}
            onClick={() => updateFavouriteProduct(isFavourite)}
          ></div>
        </div>
      )}
      <div className="product-image">
        <img
          src={props.image ? props.image : defaultImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage
          }}
          onClick={() => {
            setModal(true);
            setviewProduct({
              image: props.image,
              title: props.title,
              price: props.price,
              description: props.description
            })

          }}
        />
      </div>
      <div className="product-mid-text">
        <Tooltip content={props.title}>
          <h3>{props.title.slice(0, 18)}{props.title.length > 18 && "..."}</h3>
        </Tooltip>
        <p>{props.description}</p>
        {
          // props.quantity_remaining <= 3 && props.quantity_remaining > 0 ? (
          //   <p className="quantity_remaining">
          //     Only {Math.floor(props.quantity_remaining)} {Math.floor(props.quantity_remaining) === 1 ? 'item' : 'items'} left
          //   </p>
          // ) : null
        }
      </div >
      <div className="price">
        <div>
          {props.oldprice ? (
            <p className="strikethrough-price">
              <span className="ruppe">₹</span> {parseFloat(props.oldprice).toFixed(2)}
            </p>
          ) : null}
          <p>
            <span className="ruppe">₹</span> {price}
          </p>
        </div>
        {outOfStock ? (
          <p className="out-of-stock">Out Of Stock</p>
        ) : (
          <AddToCartButton product={props} />
        )}
      </div>
    </div >
  );
};

export default ProductCard;

ProductCard.defaultProps = {
  image: defaultImage,
};
