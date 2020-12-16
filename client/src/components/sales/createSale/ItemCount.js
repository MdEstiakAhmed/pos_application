import React, { useState, useEffect } from 'react';

const ItemCount = (props) => {
    const {id, max, cart, setCart} = props;
    const [count, setCount] = useState(1)

    useEffect(() => {
        for(let i=0; i<cart.length; i++){
            if(cart[i]._id === id){
                setCount(cart[i].count);
            }
        }
    }, [])
    
    const increment = () => {
        if(max > count){
            setCount(prevCount => prevCount + 1)
            for(let i=0; i<cart.length; i++){
                if(cart[i]._id === id){
                    cart[i].count++;
                }
            }
            setCart([...cart])
        }
    }

    const decrement = () => {
        if(count > 0){
            setCount(prevCount => prevCount - 1)
            for(let i=0; i<cart.length; i++){
                if(cart[i]._id === id){
                    cart[i].count--;
                }
            }
            setCart([...cart])
        }
    }

    return (
        <div>
            <button className="link-btn px-4 text-dark" onClick={decrement}>-</button>
            <strong>{count}</strong>
            <button className="link-btn px-4 text-dark" onClick={increment}>+</button>
        </div>
    );
};

export default ItemCount;