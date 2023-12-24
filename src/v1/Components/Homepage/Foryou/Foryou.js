import React, { useEffect, useState } from "react";
import ProductCard from "../../ProductCard";
import "./Foryou.scss";
import { productAPI } from "../../../Api";
import Leftarrow from "../../../Assets/Icons/left-arrow-white.svg";
import Rightarrow from "../../../Assets/Icons/right-arrow-white.svg";

const Foryou = (props) => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await productAPI.fetchProducts({ name: props.title, id: props.pk });
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const scrollProduct = () => {
    const buttonRight = document.getElementById(`slideRightProduct${props.id}`);
    const buttonLeft = document.getElementById(`slideLeftProduct${props.id}`);

    buttonRight.onclick = function () {
      document.getElementById(props.id).scrollLeft += 230;
    };
    buttonLeft.onclick = function () {
      document.getElementById(props.id).scrollLeft -= 230;
    };
  };

  return (
    <>
      {products && products.length > 0 ? (
        <div className="feed-wrapper">
          <div className="feed-title">
            <p>For You</p>
            <h3>{props.title}</h3>
          </div>

          <div
            className="arrow arrow-product arrow-left"
            onClick={scrollProduct}
            id={`slideLeftProduct${props.id}`}
          >
            <img src={Leftarrow} alt="Left Arrow" />
          </div>

          <div className="foryou-container" id={props.id}>
            {products && products.length && products.map((item, index) => {
              if (item.quantity_remaining >= 1)
                return (
                  <div className="carousel-cell" key={item.id}>
                    <ProductCard
                      title={item.product_name}
                      quantity={item.description}
                      price={item.price}
                      image={item.photo}
                      // cart_func={props.cart_handler}
                      id={item.id}
                      description={item.description}
                      category={item.category ? item.category.name : ""}
                      oldprice={item.market_price}
                      outofstock={item.out_of_stock}
                      quantity_remaining={item.quantity_remaining}
                    />
                  </div>
                );
            })}

            {products.map((item, index) => {
              if (item.quantity_remaining < 1)
                return (
                  <div className="carousel-cell" key={item.id}>
                    <ProductCard
                      title={item.product_name}
                      quantity={item.description}
                      price={item.price}
                      image={item.photo}
                      // cart_func={props.cart_handler}
                      id={item.id}
                      description={item.description}
                      category={item.category ? item.category.name : ""}
                      oldprice={item.market_price}
                      outofstock={item.out_of_stock}
                      quantity_remaining={item.quantity_remaining}
                    />
                  </div>
                );
            })}
          </div>

          <div
            className="arrow arrow-product arrow-right"
            onClick={scrollProduct}
            id={`slideRightProduct${props.id}`}
          >
            <img src={Rightarrow} alt="Left Arrow" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Foryou;

Foryou.defaultProps = {
  title: "Best Sellers",
  image: "https://picsum.photos/536/354",
};
