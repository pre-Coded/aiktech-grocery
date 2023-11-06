import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "..";
import "./SearchResults.scss";
const SearchResults = (props) => {
  const [visible, setvisible] = useState(false);
  const ref = useRef();
  const [isVisible, setisVisible] = useState();

  useEffect(() => {
    if (isVisible) {
      props.fetchMoreItems();
    }
  }, [isVisible]);

  return (
    <div className="search-result-container">
      <h3>Results</h3>
      {props.data && props.data.length > 0
        ? props.data.map((item) => {
          return (
            <ProductCard
              title={item.product_name}
              quantity={item.description}
              price={item.hasOwnProperty('price_variation') ? item.price_variation['price'] : item.price}
              image={item.photo}
              id={item.id}
              description={item.description}
              category={item.category ? item.category.name : ""}
              oldprice={item.hasOwnProperty('price_variation') ? item.price_variation['market_price']: item.market_price}
              outofstock={item.out_of_stock}
              quantity_remaining={item.quantity_remaining}
            />
          );
        })
        : null}
      {props.searchTerm.length > 0 && props.data.length === 0 ? (
        <p className="everything-delivery-message">
          Can't find what you're looking for, try
          <Link
            style={{ textDecoration: "none" }}
            to="/everythingdelivery"
            onClick={() => {
              props.overlayHandler(false);
              props.resultsHandler(false);
            }}
          >
            {" "}
            <strong className="everything-delivery-message">
              Make Your Own List
            </strong>
          </Link>
        </p>
      ) : null}

      <center>
        {props.loadMore &&
          props.data.length % 10 === 0 &&
          props.data.length > 0 ? (
          <button
            ref={ref}
            onClick={props.fetchMoreItems}
            className="btn load-more"
          >
            Load More
          </button>
        ) : null}
      </center>
    </div>
  );
};

export default SearchResults;
