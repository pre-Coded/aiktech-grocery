import React from 'react'
import { Addonbanner, TextHeading, Paragraph } from '../../Components'
import '../Terms/Terms.scss'

export default function Shippingpolicy() {
  return (
    <div>
        <Addonbanner heading="Shipping Policy" smallheading="Last updated: Febaury 7, 2022"/>
        
        <div className='addon-container'>
            <div className='addon-content'>
                
            
                <Paragraph text={`Phurti ("we" and "us") is the operator of (https://phurti.in) ("Website"). By
                          placing an order through this Website you will be agreeing to the terms below.
                          These are provided to ensure both parties are aware of and agree upon this
                          arrangement to mutually protect and set expectations on our service.`} />

                <br />

                <TextHeading fontWeight="bold" heading="1. General"/>
                <Paragraph text="
               Subject to stock availability. We try to maintain accurate stock counts on our
               website but from time-to-time there may be a stock discrepancy and we will not
               be able to fulfill all your items at time of purchase. In this instance, we will
               fulfill the available products to you, and contact you about whether you would
               prefer to await restocking of the backordered item or if you would prefer for us
               to process a refund.
               " />
                <br />

                <TextHeading fontWeight="bold" heading="2. Shipping Costs"/>
                <Paragraph text="Shipping costs are calculated during checkout based on weight, dimensions and
                  destination of the items in the order. Payment for shipping will be collected
                  with the purchase.
                  This price will be the final price for shipping cost to the customer.
                  " />
                <br />

                <TextHeading fontWeight="bold" heading="3. Returns"/>
                <TextHeading fontWeight="bold" heading="3.1 Return Due To Change Of Mind"/>
                <Paragraph text="Phurti will happily accept returns due to change of mind as long as a request to
                            return is received by us within 1 days of receipt of item and are returned to us
                            in original packaging, unused and in resellable condition.
                            Return shipping will be paid at the customers expense and will be required to
                            arrange their own shipping.
                            " 
                />
                <Paragraph text="Once returns are received and accepted, refunds will be processed to store
                  credit for a future purchase. We will notify you once this has been completed
                  through email." 
                />
                <Paragraph text="(Phurti) will refund the value of the goods returned but will NOT refund the
                  value of any shipping paid." />

                <br />
                
                <TextHeading fontWeight="bold" heading="3.2 Warranty Returns"/>
                <Paragraph text="Phurti will happily honor any valid warranty claims, provided a claim is
                  submitted within 90 days of receipt of items.
                            " 
                />
                <Paragraph text="Customers will be required to pre-pay the return shipping, however we will
                          reimburse you upon successful warranty claim.
                            " 
                />

                <Paragraph text="Upon return receipt of items for warranty claim, you can expect Phurti to
                        process your warranty claim within 7 days.
                        "
                />
                <Paragraph text="Once warranty claim is confirmed, you will receive the choice of:"
                />
                <Paragraph text="(a) refund to your payment method"
                />
                <Paragraph text="(b) a refund in store credit"
                />
                <Paragraph text="(c) a replacement item sent to you (if stock is available)"
                />
                <br />

                <TextHeading fontWeight="bold" heading="4. Delivery Terms"/>
                <TextHeading fontWeight="bold" heading="4.1 Transit Time Domestically"/>
                <Paragraph text="In general, domestic shipments are in transit for 2 - 7 days" />

                <br />
                <TextHeading fontWeight="bold" heading="4.2 Transit time Internationally"/>
                <Paragraph text="Generally, orders shipped internationally are in transit for 4 - 22 days. This
                          varies greatly depending on the courier you have selected. We are able to offer
                          a more specific estimate when you are choosing your courier at checkout." />


                <br />
                <TextHeading fontWeight="bold" heading="5. Tracking Notifications"/>
                <Paragraph text="Upon dispatch, customers will receive a tracking link from which they will be
                            able to follow the progress of their shipment based on the latest updates made
                            available by the shipping provider.
                            " />

                <br />
                <TextHeading fontWeight="bold" heading="6. Parcels Damaged In Transit"/>
                <Paragraph text="If you find a parcel is damaged in-transit, if possible, please reject the
                            parcel from the courier and get in touch with our customer service. If the
                            parcel has been delivered without you being present, please contact customer
                            service with next steps" />
                          
                <br />
                <TextHeading fontWeight="bold" heading="7. Duties & Taxes"/>
                <TextHeading fontWeight="bold" heading="7.1 Sales Tax"/>
                <Paragraph text="Sales tax has already been applied to the price of the goods as displayed on the website" />
                
                <br />
                <TextHeading fontWeight="bold" heading="7.2 Import Duties & Taxes"/>
                <Paragraph text="Import duties and taxes for international shipments will be pre-paid, without
                          any additional fees to be paid by customer upon arrival in destination country " />

                <br />
                <TextHeading fontWeight="bold" heading="8. Cancellations"/>
                <Paragraph text="If you change your mind before you have received your order, we are able to
                            accept cancellations at any time before the order has been dispatched. If an
                            order has already been dispatched, please refer to our refund policy." />
                
                <br />
                <TextHeading fontWeight="bold" heading="9. Insurance"/>
                <Paragraph text="Parcels are insured for loss and damage up to the value as stated by the courier." />

                <br />
                <TextHeading fontWeight="bold" heading="9.1 Process for parcel damaged in-transit"/>
                <Paragraph text="We will process a refund or replacement as soon as the courier has completed
                            their investigation into the claim." />

                <br />
                <TextHeading fontWeight="bold" heading="9.2 Process for parcel lost in-transit"/>
                <Paragraph text="We will process a refund or replacement as soon as the courier has conducted an
                            investigation and deemed the parcel lost." />
            
                <br />
                <TextHeading fontWeight="bold" heading="10. Customer service"/>
                <Paragraph text="For all customer service enquiries, please email us at vbvb" />
            
                <br />
                <Paragraph text="Shipping Policy Generated at Easyship.com [https://www.easyship.com]" />
            
            </div>
        </div>
    </div>
  )
}
