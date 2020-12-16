import React, { useState, useEffect } from 'react';

const PurchasePreview = (props) => {
    const { totalCost, register, errors, handleSubmit, onSubmit, loader, addMore } = props;

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} id="productForm">
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input type="text" className="form-control" name="customerName" id="customerName" ref={register({ required: true })} placeholder="customer name" />
                    <small id="emailHelp" className="form-text text-danger">{errors.customerName && "invalid customer name"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="totalPrice">Total Price</label>
                    <input type="text" className="form-control" name="totalPrice" id="totalPrice" ref={register({ required: true, pattern: /^[0-9.]+$/ })} defaultValue={totalCost} placeholder="total Price" />
                    <small id="emailHelp" className="form-text text-danger">{errors.totalPrice && "invalid total price"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="payPrice">payable Price</label>
                    <input type="text" className="form-control" name="payPrice" id="payPrice" ref={register({ required: true, pattern: /^[0-9.]+$/ })} defaultValue={totalCost} placeholder="payable Price" />
                    <small id="emailHelp" className="form-text text-danger">{errors.payPrice && "invalid payment price"}</small>
                </div>

                {
                    loader ?
                    <button className="btn btn-primary my-2">loading...</button> :
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                }
                <button className="btn btn-secondary m-2" onClick={addMore}>add more</button>
            </form>
        </div>
    );
};

export default PurchasePreview;