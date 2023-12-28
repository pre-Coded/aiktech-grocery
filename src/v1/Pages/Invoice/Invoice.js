import React, { useEffect, useState } from 'react'
import Invoiceslip from './Invoiceslip'
import './Invoice.scss'
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import InvoicePdfTemplate from './InvoicePdfTemplate';
import Button from '../../Components/Homepage/Button/Button';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { dashboardAPI } from '../../Api';
import { toast } from 'react-toastify';
import { cartAPI } from '../../Api';
import Loader from '../../Components/Loader';
import get from 'lodash/get';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const mapStateToProps = ({  auth }) => ({
    auth
  });
export default function Invoice(props) {
    const {
        auth
      } = useSelector(mapStateToProps);

    const { orderid } = useParams();
    const [orderDetails,setOrderDetails] = useState(null);
    const [invoice, setInvoice] = useState(null)
    useEffect(async ()=>{
        const data={
            "id":orderid
        }
        const response =await dashboardAPI.fetchOrderDetails(data);
        setOrderDetails(response.data);
        fetchInvoiceDetails();
    },[])
    
    
    const fetchInvoiceDetails = async () => {
        try {
            const res = await cartAPI.fetchInvoice({ invoiceId: orderid });
            if (res.data.status === 400) {
                setInvoice({})
                toast.error('No invoice found');
            } else {
                const invoiceData = get(res, 'data', {});
                setInvoice(invoiceData)
            }
        } catch (error) {
            console.log(error)
            setInvoice({})
        }
    }
    
    
    console.log(orderid, "order id");
    console.log(auth.userDetails,"user details");
    console.log(orderDetails,"order details usestate variable");
    console.log(invoice,"invoice");
    const doc = new jsPDF();

    const handleDownloadInvoice = () => {
        

        const inputElement = document.getElementById('invoice-slip-pdf');

        if (inputElement) {
            html2pdf(inputElement, {
                margin: 10,
                filename: 'invoice.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).then((pdf) => {
                const blob = pdf.output('blob');
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'output.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        
    }
    else{
        toast.error("order details not fixed yet");
    }

    };


     return   (
        orderDetails && invoice ? <>
            <div className="invoice-container">
                <Invoiceslip id={orderid} invoice={invoice} />
                <div style={{
                    transform: 'translateX(200%)',
                    position: 'absolute',
                    display:'none'
                }}>
                    <InvoicePdfTemplate id={orderid} userDetails={auth.userDetails} 
                     orderDetails={orderDetails} invoice={invoice}/>
                </div>
            </div>
            <div style={{
                backgroundColor :'#f2f2f2',
                display : 'flex',
                justifyContent : 'center', 
                paddingBottom : '2rem'
            }}>
                <Button
                    text="Download Invoice"
                    clicker={handleDownloadInvoice}
                />
            </div>
        </>:(
        <div className='loader'>
            <Loader/>
        </div>
        )
    )
}