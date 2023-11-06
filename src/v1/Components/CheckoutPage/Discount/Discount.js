import "./Discount.scss";
import React, { useEffect, useState } from "react";
import DiscountCard from "./DiscountCard";
import { cartAPI } from "../../../Api";
import { toast } from "react-toastify";
import { errorMsg } from "../../../Utils";
import { useDispatch } from "react-redux";
import { actionsCreator } from "../../../Redux/actions/actionsCreator";
import { Button, InputField } from "../..";
const Discount = ({ cartData }, props) => {
  const [discountCode, setDiscountCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discountInput, setDiscountInput] = useState("");

  const dispatch = useDispatch();
  const [discountData, setdiscountData] = useState(null);

  const discountFetcher = async () => {
    try {
      const response = await cartAPI.fetchDiscounts();
      setdiscountData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const applyDiscount = async (discountCode) => {
    try {
      if (discountCode) {
        setLoading(true);
        const response = await cartAPI.applyDiscount({
          discount_code: discountCode,
        });
        toast.success("Discount is applied successfully", {
          toastId: "discount",
        });
        setDiscountInput('');
        setLoading(false);
        fetchCartDetails();
      }
      else {
        toast.error('Discount code is required',{
          toastId: "discount1",
        });
      }
    } catch (error) {
      const errMsg = errorMsg(error);
      toast.error(errMsg);
      setLoading(false);
      fetchCartDetails();
    }
  };

  const removeDiscount = async (event = null, discountCode) => {
    if (event)
      event.stopPropagation();
    try {
      const response = await cartAPI.removeDiscount({
        discount_code: discountCode,
      });
      setDiscountCode("");
      toast.success("Discount is removed successfully");
      fetchCartDetails();
    } catch (error) {
      const errMsg = errorMsg(error.message);
      toast.error(errMsg);
      setDiscountCode("");
    }
  };

  const fetchCartDetails = async () => {
    dispatch(actionsCreator.FETCH_CART_DETAILS());
  };

  useEffect(() => {
    discountFetcher();
  }, []);

  useEffect(() => {
    if (cartData) {
      const { discount_code = "" } = cartData;
      setDiscountCode(discount_code);
    }
  }, [cartData]);

  // useEffect(() => {
  //   if (discountCode != "" && discountCode != null) {
  //     removeDiscount(null, discountCode)
  //   }
  // }, [cartData.final_item])

  return (
    <div className="discount-wrapper">
      <br />
      <div className="discount-title-wrapper">
        <h5>DISCOUNT</h5>
        <div className="discount-form">
          <InputField
            onChange={(e) => {
              setDiscountInput(e.target.value);
            }}
            placeholder="Enter Code"
            cn="discount-input"
            value={discountInput}
          />
          <button
            className="submit-discount"
            onClick={() => applyDiscount(discountInput)}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="discount-scroll">
        {discountData
          ? discountData.map((item, index) => {
            return (
              <DiscountCard
                code={item.code}
                title={item.value}
                discountCode={discountCode}
                key={index}
                clickFunc={applyDiscount}
                type={item.discount_code_type}
                pk={item.id}
                currentSelection={discountCode}
                removeDiscount={removeDiscount}
                loading={loading}
              />
            );
          })
          : null}
      </div>
    </div>
  );
};

export default Discount;