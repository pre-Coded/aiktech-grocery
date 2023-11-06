import React from 'react'
import { Addonbanner, TextHeading, Paragraph } from '../../Components'
import '../Terms/Terms.scss'

export default function Privacypolicy() {
  return (
    <div>
        <Addonbanner heading="Useful Information" smallheading="Last updated: Febaury 22, 2022"/>
        
        <div className='addon-container'>
            <div className='addon-content'>
                <TextHeading fontWeight="bold" heading="About Us" id="Aboutus"/>
                <Paragraph lineHeight="2rem" text="Real Value Mart has been delighting customers for years. Find the widest collection and get free delivery on every order. Order through realvaluemart.in" />
                <br />
                
                <TextHeading fontWeight="bold" heading="Terms & conditions" id="TermsConditions" />
                <Paragraph lineHeight="2rem" text="Realvaluemart offers a discount on grocery delivery. When you place an order with us you agree to the terms and conditions of this agreement which govern the terms of our deliveries to you and your use of our website. This contract is between you and Realvaluemart that specifies the terms under which you might utilize the website and get shipments from us. " />
                <br />
                
                <TextHeading fontWeight="bold" heading="Realvaluemart Delivery Services" id="PhurtiDeliveryServices" />
                <Paragraph lineHeight="2rem" text="We will make every effort to get your groceries delivered to you within minutes. Your order will arrive with an invoice that will list all items you have received and were billed for. If something is missing from your order please drop an email at ziyuzabi@gmail.com and we will ensure it gets delivered."/>
                <br />
                
                <TextHeading fontWeight="bold" heading="Payment Methods" id="PaymentMethods"/>
                <Paragraph lineHeight="2rem" text="We accept Cash on Delivery(COD) and all type of online payment." />
                <br />

                <TextHeading fontWeight="bold" heading="Return Policy" id="ReturnPolicy" />
                <Paragraph lineHeight="2rem" text={`We provide a "no questions asked" return policy. We are available to assist you if a problem arises with your order. If the customer wants to return the products they have to request for return within 24 hrs of the delivery of the products along with the product image. The amount will be refunded via the same source within seven working days.`} />
                <br />

                <TextHeading fontWeight="bold" heading="Privacy Policy" id="PrivacyPolicy"/>
                <Paragraph lineHeight="2rem" text="We implement a variety of security measures to maintain the safety of your personal information. We will not sell, provide or transfer your personal information to others. If you purchase one of our products you authorize us to use your name and identification information in advertising or promotions." />
                <br />
                
                <Paragraph lineHeight="2rem" text="We may use personal information in an aggregate form (i.e., not individually attributable to you) for business analysis, operational, marketing and other promotional purposes. These policies may be amended by us at any time and without notice but will be posted on this page. You agree that your continued use of our website and products after that date will constitute your consent and acceptance of the amendment." />
                 
                <br />

                {/* Contact Us Start  */}
                <TextHeading fontWeight="bold" heading="Contact Us" id="ContactUs"/>
                {/* <br /> */}

                <TextHeading fontWeight="bold" heading="Address"  fontSize=".8rem"/>
                <Paragraph lineHeight="2rem" text="No. 37/a, Adjacent to vars carlton court, opposite of vars camelia Bangalore, Karnataka 560048" />
                
                <br />
                
                <TextHeading fontWeight="bold" heading="Phone"  fontSize=".8rem"/>
                <a href="tel:+918861144646 ">
                  <Paragraph fontWeight="bold" text="+918861144646 " />
                </a>

                <br />

                <TextHeading fontWeight="bold" heading="E-mail"  fontSize=".8rem"/>
                <a href="mailto:ziyuzabi@gmail.com">
                  <Paragraph fontWeight="bold" text="ziyuzabi@gmail.com" />
                </a>
                {/* Contact Us End  */}




            </div>
        </div>
        {/* <div className="addonCenter" id="ContactUs">
          <Paragraph text="For any further queries, drop us an email at" lineHeight="2rem"/>
          <a href="mailto:tech@phurti.in">
            <TextHeading fontWeight="bold" heading="team@phurti.in" id="PrivacyPolicy" fontSize="1.5rem"/> 
          </a>

        </div> */}
    </div>
  )
}
