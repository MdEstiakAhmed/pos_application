import React from 'react';

const ProductForm = (props) => {
    const { register, errors, handleSubmit, onSubmit, loader } = props;
    const {name, barcode, purchasePrice, salesPrice, quantity} = props.value;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="productForm">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" className="form-control" name="name" id="name" ref={register({ required: true })} defaultValue={name && name} placeholder="product name" />
                    <small id="emailHelp" className="form-text text-danger">{errors.name && "invalid name"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="barcode">barcode</label>
                    <input type="text" className="form-control" name="barcode" id="barcode" ref={register({ required: true })} defaultValue={barcode && barcode} placeholder="barcode" readOnly={barcode ? true : false} />
                    <small id="emailHelp" className="form-text text-danger">{errors.barcode && "invalid barcode"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="purchasePrice">Purchase Price</label>
                    <input type="text" className="form-control" name="purchasePrice" id="purchasePrice" ref={register({ required: true, pattern: /^[0-9.]+$/ })} defaultValue={purchasePrice && purchasePrice} placeholder="Purchase Price" />
                    <small id="emailHelp" className="form-text text-danger">{errors.purchasePrice && "invalid purchase price"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="salesPrice">Sales Price</label>
                    <input type="text" className="form-control" name="salesPrice" id="salesPrice" ref={register({ required: true, pattern: /^[0-9.]+$/ })} defaultValue={salesPrice && salesPrice} placeholder="Sales Price" />
                    <small id="emailHelp" className="form-text text-danger">{errors.salesPrice && "invalid sales price"}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">quantity</label>
                    <input type="number" className="form-control" name="quantity" id="quantity" ref={register({ required: true, pattern: /^\d*[0-9]\d*$/ })} defaultValue={quantity && quantity} placeholder="quantity" />
                    <small id="emailHelp" className="form-text text-danger">{errors.quantity && "invalid quantity"}</small>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="image[0]">product image</label>
                    <input type="text" className="form-control" name="image[0]" id="image[0]" ref={register} defaultValue="" placeholder="first image" />
                </div>

                <div className="form-group">
                    <label htmlFor="image[1]">product image</label>
                    <input type="text" className="form-control" name="image[1]" id="image[1]" ref={register} defaultValue="" placeholder="first image" />
                </div> */}

                {
                    loader ?
                    <button className="btn btn-primary my-2">loading...</button> :
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                }
            </form>
        </>
    );
};

export default ProductForm;