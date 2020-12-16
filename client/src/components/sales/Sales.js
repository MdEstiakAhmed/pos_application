import React, {useState} from 'react';
import CartCalculate from './createSale/CartCalculate';
import CartItem from './createSale/CartItem';
import ProductList from './createSale/ProductList';
import { useForm } from "react-hook-form";
import PurchasePreview from './createSale/PurchasePreview';

const Sales = () => {
    const [cart, setCart] = useState([])
    const [totalCost, setTotalCost] = useState(0);
    const [switchCart, setSwitchCart] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const [loader, setLoader] = useState(false);

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
                id: cart[i]._id,
                name: cart[i].name,
                quantity: cart[i].count,
                price: cart[i].salesPrice,
                totalPrice: cart[i].count * cart[i].salesPrice,
            }
            invoice.product = [...invoice.product, obj]
        }
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
                    !switchCart ?
                    <div className="container">
                        <ProductList cart={cart} setCart={setCart}/>
                        <div class="row justify-content-between">
                            <div class="col-6">
                                <CartItem cart={cart} setCart={setCart}/>
                            </div>
                            <div class="col-4">
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