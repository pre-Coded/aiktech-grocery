import React, { useEffect, useState } from "react";
import ProductCard from "../../ProductCard";
import data from "../../../Data/popular.json";
import "./CategoryProducts.scss";
import axios from "axios";

const CategoryProducts = () => {
  const [data, setdata] = useState(null);
  const [tab, settab] = useState("Snacks");

  const fetchData = () => {
    axios
      .get("https://phurti.in/api/shop/products/" + tab + "/")
      .then((response) => {
        console.log(response);
        setdata(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="tab-products ">
        {data
          ? data.map((item) => {
            return (
              <ProductCard
                key={item.id}
                title={item.product_name}
                oldprice={item.hasOwnProperty('price_variation') ? item.price_variation['market_price']: item.market_price}
                price={item.hasOwnProperty('price_variation') ? item.price_variation['price'] : item.price}
                image={item.photo}
                quantity_remaining={item.quantity_remaining}
              />
            );
          })
          : null}
      </div>
    </div>
  );
};

export default CategoryProducts;
