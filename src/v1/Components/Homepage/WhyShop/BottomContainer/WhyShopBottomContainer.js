import React from "react";
import WhyShopStepCard from "../WhyShopStepCard";
import "./WhyShopBottomContainer.scss";
import step1 from "../../../../Assets/Images/why shop with us/icon/step1.svg";
import step2 from "../../../../Assets/Images/why shop with us/icon/step2.svg";
import step3 from "../../../../Assets/Images/why shop with us/icon/step3.svg";
import mobileStep1 from "../../../../Assets/Images/why shop with us/icon/mobile-step1.svg";
import mobileStep2 from "../../../../Assets/Images/why shop with us/icon/mobile-step2.svg";
import mobileStep3 from "../../../../Assets/Images/why shop with us/icon/mobile-step3.svg";
import wave from "../../../../Assets/Images/why shop with us/icon/wave.svg";
import WhyShopStepCardMobile from "./WhyShopStepCardMobile";

const WhyShopBottomContainer = () => {
  return (
    <div className="bottom-whyshop">
      <div className="whyshop-pc">
        <h2>Want it, You got it</h2>
        <div className="bottom-whyshop-container">
          <img src={wave} alt="" className="wave" />
          <div className="steps-wrapper">
            <WhyShopStepCard
              image={step1}
              number={1}
              text="Cooking gajar ka halwa and out of sugar?"
            />
            <WhyShopStepCard
              image={step2}
              number={2}
              text="Order through Realvaluemart.in"
            />
            <WhyShopStepCard
              image={step3}
              number={3}
              text="Get it in just minutes!"
            />
          </div>
        </div>
      </div>
      <div className="whyshop-mobile">
        <h2>Three Easy Steps</h2>
        <WhyShopStepCardMobile
          image={mobileStep1}
          bgcolor={"#8599FA"}
          text={"Add your favourite items to the cart."}
        />
        <WhyShopStepCardMobile
          image={mobileStep2}
          bgcolor={"#ffffff"}
          text="Place your Order."
        />
        <WhyShopStepCardMobile
          image={mobileStep3}
          bgcolor={"#8599FA"}
          text="Get it delivered at your doorstep in 10 Minutes."
        />
      </div>
    </div>
  );
};

export default WhyShopBottomContainer;
