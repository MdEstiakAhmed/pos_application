import React, {useState} from 'react';
import {  useHistory } from 'react-router-dom';
import CartCalculate from './createSale/CartCalculate';
import CartItem from './createSale/CartItem';
import ProductList from './createSale/ProductList';
import { useForm } from "react-hook-form";
import PurchasePreview from './createSale/PurchasePreview';
import Alert from '../alert/Alert'

const Sales = () => {
    const history = useHistory();

    const [cart, setCart] = useState([])
    const [totalCost, setTotalCost] = useState(0);
    const [switchCart, setSwitchCart] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState({success: false, error: false, message: ''});

    const onSubmit = data => {
        let invoice = {
            customerName: data.customerName,
            product: [],
            totalPrice: data.totalPrice,
            paidAmount: data.payPrice,
            dueAmount: data.totalPrice-data.payPrice
        };
        for(let i=0; i<cart.length; i++){
            const obj = {
                _id: cart[i]._id,
                name: cart[i].name,
                quantity: cart[i].count,
                price: cart[i].salesPrice,
                totalPrice: cart[i].count * cart[i].salesPrice,
            }
            invoice.product = [...invoice.product, obj]
        }

        setAlert({success: false, error: false, message: ''});
        setLoader(true);

        fetch('http://localhost:5000/invoice', {
        method: 'POST',
        mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(invoice),
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setLoader(false);
                setAlert({success: true, error: false, message: data.message});
                history.push('/');
            }
            else{
                setLoader(false);
                setAlert({success: false, error: true, message: data.message});
            }
        })
        .catch(error => {
            setLoader(false);
            setAlert({success: false, error: true, message: error.message});
        })
    }

    const purchaseHandle = () => {
        setSwitchCart(true)
    }

    const addMore =() => {
        setSwitchCart(false)
    }

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Sales</h1>
                </div>
                {
                    alert.success ?
                    <Alert message={alert.message} status={true}/> :
                    alert.error ?
                    <Alert message={alert.message} status={false}/> :
                    null
                }
                {
                    !switchCart ?
                    <div className="container">
                        <ProductList cart={cart} setCart={setCart}/>
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <CartItem cart={cart} setCart={setCart}/>
                            </div>
                            <div className="col-4">
                                <CartCalculate cart={cart} setTotalCost={setTotalCost} purchaseHandle={purchaseHandle}/>
                            </div>
                        </div>
                    </div> :
                    <div className="container">
                        {
                            totalCost > 0 ?
                            <PurchasePreview totalCost={totalCost} register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} loader={loader} addMore={addMore}/> :
                            null
                        }
                    </div>

                }
            </main>
        </>
    );
};

export default Sales;