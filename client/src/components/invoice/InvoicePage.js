import React, {useState, useEffect} from 'react';
import {  useHistory, useParams } from 'react-router-dom';

const InvoicePage = () => {
    const {id} = useParams();
    const [invoiceInfo, setInvoiceInfo] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/invoice/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setInvoiceInfo(data.data);
            }
            else{
                setInvoiceInfo({});
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    console.log(invoiceInfo)

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Invoice Details</h1>
                </div>
                <div className="container">
                    <div className="invoicePage">
                        <div className="card">
                            <div className="card-header">
                                <h2>Invoice</h2>
                            </div>
                            <div className="card-body">
                                <h3>{invoiceInfo.customerName}</h3>
                                <h5>Invoice ID: {invoiceInfo._id}</h5>
                                <br/>
                                <hr/>
                                <br/>

                                <div className="row">
                                    <div className="col-3">
                                        <strong>id</strong>
                                    </div>
                                    <div className="col-3">
                                        <strong>product name</strong>
                                    </div>
                                    <div className="col-2 text-center">
                                        <strong>quantity</strong>
                                    </div>
                                    <div className="col-2 text-center">
                                        <strong>base price</strong>
                                    </div>
                                    <div className="col-2 text-right">
                                        <strong>total price</strong>
                                    </div>
                                </div>

                                <hr/>

                                {
                                    invoiceInfo.product ?
                                    invoiceInfo.product.map(item => {
                                        return(
                                            <div className="row my-2">
                                                <div className="col-3">
                                                    <strong>{item._id}</strong>
                                                </div>
                                                <div className="col-3">
                                                    <strong>{item.name}</strong>
                                                </div>
                                                <div className="col-2 text-center">
                                                    <strong>{item.quantity}</strong>
                                                </div>
                                                <div className="col-2 text-center">
                                                    <strong>{item.price}</strong>
                                                </div>
                                                <div className="col-2  text-right">
                                                    <strong>{item.totalPrice}</strong>
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    null
                                }
                            </div>
                            <div className="card-footer">
                                <div className="row justify-content-end">
                                    <div className="col-4 text-right">
                                        <p><strong>Total Price: </strong></p>
                                        <p><strong>Paid Price: </strong></p>
                                        <p><strong>Due Price: </strong></p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <p><strong>{invoiceInfo.totalPrice}</strong></p>
                                        <p><strong>{invoiceInfo.paidAmount}</strong></p>
                                        <p><strong>{invoiceInfo.dueAmount}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default InvoicePage;