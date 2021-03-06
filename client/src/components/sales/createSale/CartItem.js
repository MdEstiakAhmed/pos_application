import React from 'react';
import ItemCount from './ItemCount';

const CartItem = (props) => {
    const { cart, setCart } = props;

    const removeCart = (id) => {
        let newCart = cart;
        let removedItemCheck = newCart.indexOf(id);
        if (removedItemCheck > -1) {
            newCart.splice(removedItemCheck, 1)
        }
        setCart([...newCart]);
    }

    const handleSalesPrice = (id, newPrice) => {
        if(newPrice > 0){
            for(let i=0; i<cart.length; i++){
                if(cart[i]._id === id){
                    cart[i].salesPrice = newPrice;
                }
            }
            setCart([...cart])
        }
    }

    return (
        <>
            <h4>cart:</h4>
            <div className="">
                {
                    cart.length > 0 ?
                    (
                        cart.map((product) => {
                            return( 
                                <div key={product._id} className="m-3 py-2 px-3 bg-light rounded">
                                    <div className="row justify-content-between">
                                        <div className="col-6">
                                            <p className="">{product.name}</p>
                                            <p className="">purchase price: {product.purchasePrice}</p>
                                            <p className="">sale price: <input type="text" className="w-25" defaultValue={product.salesPrice} onChange={(e) => handleSalesPrice(product._id, e.target.value)}/></p>
                                            
                                        </div>
                                        <div className="col-4 text-right">
                                            <ItemCount id={product._id} max={product.quantity} cart={cart} setCart={setCart}/>
                                        </div>
                                        <div className="col-2 text-right">
                                            <button className='link-btn text-dark' onClick={() => removeCart(product)}>x</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) :
                    <h6 className="p-3 bg-light">No item in cart</h6>
                }
            </div>
        </>
    );
};

export default CartItem;