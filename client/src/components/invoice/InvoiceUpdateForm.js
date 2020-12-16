import React from 'react';

const InvoiceUpdateForm = (props) => {
    const { value, register, errors, handleSubmit, onSubmit, loader } = props;
    console.log(value)
    return (
        <div>
            <div className="card">
                <div className="card-header text-center"><h2>Invoice Summary</h2></div>
                <div className="card-body">
                    <h4>Customer name: {value.customerName}</h4>
                    <h4>Invoice ID: {value._id}</h4>
                    <h5>Total price: {value.totalPrice}</h5>
                    <h5>paid price: {value.paidAmount}</h5>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="productForm" className="mt-5">
            <div className="form-group">
                    <label htmlFor="dueAmount">Due Price</label>
                    <input type="text" className="form-control" name="dueAmount" id="dueAmount" ref={register({ required: true, pattern: /^[0-9.]+$/ })} defaultValue={value.dueAmount} placeholder="Purchase Price" />
                    <small id="emailHelp" className="form-text text-danger">{errors.dueAmount && "invalid due price"}</small>
                </div>

                {
                    loader ?
                    <button className="btn btn-primary my-2">loading...</button> :
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                }
            </form>
        </div>
    );
};

export default InvoiceUpdateForm;