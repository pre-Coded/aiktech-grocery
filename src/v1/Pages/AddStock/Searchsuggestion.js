import React from "react";

export default function Searchsuggestion(props) {
  return props.showsuggestions ? (
    <div
      style={{
        backgroundColor: "#fff",
        border:
          props.productSuggestions &&
          props.productSuggestions.length > 0 &&
          "1px solid transparent",
        height:
          props.productSuggestions &&
          props.productSuggestions.length > 0 &&
          "200px",
        overflowY:
          props.productSuggestions &&
          props.productSuggestions.length > 0 &&
          "scroll",
        // position:
        // props.productSuggestions &&
        //   props.productSuggestions.length > 0 &&
        //   "static",
      }}
      className="search-suggestion-container"
      id="search-container"
    >
      {props.productSuggestions.map((product, index) => (
        <div
          key={index}
          className="suggestionList"
          onClick={props.handleSuggestion}
          data-productid={product.id}
          data-productdescription={product.description}
          data-producttitle={product.product_name}
          data-product-price={product.price_variation && product.price_variation.map(i => (i.price))}
          data-product-market-price={product.price_variation && product.price_variation.map(i => (i.market_price))}
          data-product-image={product.photo}
          data-product-barcode={product.barcode}
          data-product-remaining={product.remaining_products && product.remaining_products.map(i => (i.inventory_id==props.inventory? i.product_remaining: null))}
          data-product-address={product.remaining_products && product.remaining_products.map(i => (i.inventory_id==props.inventory? i.address: null))}
        >
          
          {product.product_name}({product.description})
          <p className="category_name_addstock">
            in { product.category? (Object.entries(product.category).map(([key, value]) => value).join(", ")):(null)}
          </p>
          
        </div>
      ))}
    </div>
  ) : null;
}