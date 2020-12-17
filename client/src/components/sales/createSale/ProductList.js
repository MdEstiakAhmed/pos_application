import React, { useState, useEffect } from 'react';

const ProductList = (props) => {
    const {cart, setCart} = props;
    const [product, setProduct] = useState([]);
    const [searchProduct, setSearchProduct] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/product', {
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
                setProduct(data.data);
                setSearchProduct(data.data)
            }
            else{
                setProduct([]);
                setSearchProduct([])
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const handleCart = (obj) => {
        document.getElementById('searchProduct').value = '';
        setSearchProduct(product);
        if(obj.quantity > 0){
            obj.count = 1;
            if(cart.length === 0){
                setCart([...cart, obj])
            }
            else{
                let find = cart.indexOf(obj)
                if(find === -1){
                    setCart([...cart, obj])
                }
            }
        }
    }

    const handleProductList = (str) => {
        if(str !== ""){
            let temp = product.filter(item => {
                if(item.name.includes(str) || item.barcode.includes(str)){
                    return item;
                }
            })
            setSearchProduct(temp);
        }
        else{
            setSearchProduct(product);
        }
    }

    return (
        <>
            <div className="dropdown mb-5">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="p-2">
                        <input type="text" id="searchProduct" className="dropdown-item border" onChange={e => handleProductList(e.target.value)} autocomplete="off"/>

                    </div>
                    {
                        searchProduct.length > 0 ?
                        (
                            searchProduct.map(item => {
                                return <button key={item._id} className="dropdown-item" href="#" onClick={() => handleCart(item)}>{item.name}</button>
                            })
                        ) :
                        <h6>loading...</h6>
                    }
                </div>
            </div>
        </>
    );
};

export default ProductList;