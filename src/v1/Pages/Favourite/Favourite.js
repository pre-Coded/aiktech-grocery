import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData, ProductCard } from "../../Components";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import "./Favourite.scss";

const mapStateToProps = ({ favouriteProducts, auth }) => ({
  favouriteProducts,
  auth,
});

export default function Favourite() {
  const {
    favouriteProducts = {},
    auth: { isLoggedIn = false },
  } = useSelector(mapStateToProps);
  const { products = [] } = favouriteProducts;
  const dispatch = useDispatch();
  useEffect(() => {
    fetchFavouriteProducts();
  }, []);

  const fetchFavouriteProducts = () => {
    dispatch(actionsCreator.FETCH_FAVOURITE_PRODUCTS());
  };
  return (
    <div className="favourite-product-container">
      {products && products.length > 0 ? (
        <div className="tab-products">
          {products.sort((a, b) => b.quantity_remaining - a.quantity_remaining).map((item) => {
            const { product_id = {} } = item || {};
            return (
              <ProductCard
                key={product_id.id}
                title={product_id.product_name}
                image={product_id.photo}
                oldprice={product_id.hasOwnProperty('price_variation') ? product_id.price_variation['market_price']: product_id.market_price}
                price={product_id.hasOwnProperty('price_variation') ? product_id.price_variation['price'] : product_id.price}
                quantity={product_id.quantity}
                description={product_id.description}
                id={product_id.id}
                category={product_id.category ? product_id.category.name : ""}
                quantity_remaining={item.quantity_remaining}
              />
            );
          })}
        </div>
      ) : (
        <EmptyData
          text={"There are no items in your wishlist. Please add some items"}
        />
      )}
    </div>
  );
}
