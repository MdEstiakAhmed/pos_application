import React, { useState, useEffect } from 'react';

const ProductList = (props) => {
    const {cart, setCart} = props;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/product', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setProduct(data.data);
            }
            else{
                setProduct([]);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const handleCart = (obj) => {
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

    return (
        <>
            <div class="dropdown mb-5">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        product.length > 0 ?
                        (
                            product.map(item => {
                                return <button class="dropdown-item" href="#" onClick={() => handleCart(item)}>{item.name}</button>
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