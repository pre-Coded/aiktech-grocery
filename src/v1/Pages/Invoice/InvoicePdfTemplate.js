import './InvoicepdfTemplate.scss'
import logoImg from "../../Assets/Images/navbar/new_logo.svg";


const InvoicePdfTemplate = ({userDetails, id, orderDetails, invoice}) => {
	const { data: invoiceDetails = {}, items: invoiceitem = [], final_delivery_charge = 0, packaging_charge = 0, promotional_discount, default_delivery_charge = 0 } = invoice || {}
    const { invoice_id, final_price = 0 } = invoiceDetails || {};
    return (
        <div className="invoice-wrapper flex-column gap-20" id="invoice-slip-pdf">
            <header className='flex-row items-between gap-10'>
                <img src={logoImg} />
                <h2>
                    RealvalueMart
                </h2>
            </header>
            <div>
                <div>
                    <h6>shipping Address : </h6>
                    <ul className='ul-style-none'>
                        <li>
                            {userDetails.name}
                        </li>
                        
                        {/* <li>
                            {`BENGALURU, KARNATAKA, 560037`}
                        </li> */}
						<li>{userDetails.email}</li>
						<li>{userDetails.phone_number}</li>
						<li>
                            {orderDetails.fulfilment_address}
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex-row justify-between'>
                <ul className='ul-style-none'>
                    <li className='flex-row gap-10'>
                        <span className='font-bold'>Order id :</span>{orderDetails.id}
                    </li>
                    <li className='flex-row gap-10'>
                        <span className='font-bold'>Order Date :</span>{orderDetails.created_on.split('T')[0]}
                    </li>
					<li className='flex-row gap-10'>
                        <span className='font-bold'>Order time :</span>{orderDetails.created_on.split('T')[1].split('.')[0]}
                    </li>
                </ul>
                <ul className='ul-style-none'>
                    <li className='flex-row gap-10'>
                        <span className='font-bold'>Invoice No :</span>{invoice.data.invoice_id}
                    </li>
                    {/* <li className='flex-row gap-10'>
                        <span className='font-bold'>Invoice Date :</span>{`28.10.2023`}
                    </li> */}
                </ul>
            </div>

            <table>
                <thead className='flex-row thead'>
                    
                    <th>
                        Product
                    </th>
                    <th>
                        Unit Price
                    </th>
                    <th>
                        Qty
                    </th>
                    <th>
                        Total <br/>
                        Price
                    </th>
                    <th>
                        Discount <br/>
                        Price
                    </th>
                </thead>

                <tbody className='tbody flex-column'>

                    {/* product section */}
					{invoiceitem ?
                                invoiceitem.map((i, index) => (
                                    <>
                                        <tr key={index} className='flex-row trow'>
                                            <td>{i.title ? i.title : "-"}{i.description ? ` (${i.description})` : ''}</td>
                                            <td>{parseFloat(i.quantity).toFixed(2)} {i.unit_id}</td>
                                            <td><span className="ruppe">₹</span>  {parseFloat(parseFloat(i.price)/i.quantity)!==0?parseFloat(parseFloat(i.price).toFixed(2)/i.quantity).toFixed(2): "pending"}</td>
                                            <td><span className="ruppe">₹</span>  {parseFloat(i.price)!==0? parseFloat(i.price).toFixed(2):"pending"}</td>
                                            <td><span className="ruppe">₹</span>  {parseFloat(i.final_price)!==0? parseFloat(i.final_price).toFixed(2): "pending"}</td>
                                        </tr>
                                    </>
                                ))
                                : null
                            }
                </tbody>
            </table>
            <div className='flex-row justify-end gap-20'>
                <span className='font-bold'>Price : </span>₹{parseFloat(final_price)!==0?parseFloat(final_price).toFixed(2):"pending"}
            </div>
            <div className='flex-row justify-end gap-20'>
                <span className='font-bold'>Delivery Charge : </span>{final_delivery_charge>default_delivery_charge ? `₹${default_delivery_charge}` : `₹${final_delivery_charge}`}
            </div>
            {
                final_delivery_charge>default_delivery_charge?
                <div className='flex-row justify-end gap-20'>
                    <span className='font-bold'>Night Surcharge : </span>{`₹${final_delivery_charge-default_delivery_charge}`}
                </div>:null

            }
            
            <div className='flex-row justify-end gap-20'>
                <span className='font-bold'>Packaging Charge : </span>{packaging_charge ? `₹${packaging_charge}` : "-"}
            </div>
            <div className='flex-row justify-end gap-20'>
                <span className='font-bold'>Total Price : </span>₹{parseFloat(final_price)!==0?parseFloat(final_price).toFixed(2):"pending"}
            </div>


        </div>
    )
}

export default InvoicePdfTemplate;
