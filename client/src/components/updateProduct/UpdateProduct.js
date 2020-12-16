import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {  useHistory, useParams } from 'react-router-dom';
import ProductForm from '../productForm/ProductForm';
import Alert from '../alert/Alert'

const UpdateProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [formValue, setFormValue] = useState({})
    const [alert, setAlert] = useState({success: false, error: false, message: ''});
    const [loader, setLoader] = useState(false);
    const history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`, {
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
                setFormValue(data.data);
            }
            else{
                setFormValue({});
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])
    
    const onSubmit = data => {
        
        setAlert({success: false, error: false, message: ''});
        setLoader(true);
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'PUT',
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
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setAlert({success: true, error: false, message: data.message})
                setLoader(false);
                document.getElementById('productForm').reset();
                history.push({pathname: '/viewProduct', state: {message: 'successfully update'}});
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
    };

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Update Product</h1>
                </div>
                <div className="container">
                {
                    alert.success ?
                    <Alert message={alert.message} status={true}/> :
                    alert.error ?
                    <Alert message={alert.message} status={false}/> :
                    null
                }
                {
                    Object.keys(formValue).length > 0 ?
                    <ProductForm value={formValue} register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} loader={loader}/> :
                    <p>No product found.</p>
                }
                </div>
            </main>
        </>
    );
};

export default UpdateProduct;