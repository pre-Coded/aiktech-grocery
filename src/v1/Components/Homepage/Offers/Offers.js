import React from "react";
import "./Offers.scss";
import OfferCard from "../OfferCard/OfferCard";
import { useState } from "react";
import { useEffect } from "react";
import { productAPI } from "../../../Api";
import Bannerv2 from "../Bannerv2";
import Slideshow from "../Bannerv2/Slideshow";

const Offers = () => {
  const [offersData, setoffersData] = useState([]);
  const offerFetcher = async () => {
    try {
      let response = await productAPI.fetchOffers();
      if (response) {
        response.data.sort(function (a, b) {
          let key1 = a.priority
          let key2 = b.priority
          if (key1 < key2) {
            return -1;
          }
          else if (key1 > key2) {
            return 1;
          }
          return 0;
        });
        setoffersData(response.data);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    offerFetcher();
  }, []);

  return (
    <>
      {offersData && <Slideshow images={offersData} />}
    </>
  );
};

export default Offers;
