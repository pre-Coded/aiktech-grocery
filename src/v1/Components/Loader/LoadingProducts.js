import React, { useState } from "react";
import './LoadingProducts.scss'

const LoadingProducts = (props)=>{
    const [array, setArray] = useState(Array.from({ length: props.number }, (_, index) => index + 1));

    return(
        <div className="loading-cards">
        {
        array.map((item)=>(
            <div class="card">
              <div class="card__image"></div>
              <div class="card__content">
                <h2 className="loading-card-heading"></h2>
                <p className="loading-card-para"></p>
              </div>
          </div>
            )
        )
     }
        </div>
        )
    
}

export default LoadingProducts;
