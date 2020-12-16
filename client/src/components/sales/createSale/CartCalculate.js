import React from 'react';

const CartCalculate = (props) => {
    const {cart, setTotalCost, purchaseHandle} = props;
    let total = 0;
    for(let i=0; i<cart.length; i++){
        total = total + (parseInt(cart[i].count)*parseInt(cart[i].salesPrice))
    }
    setTotalCost(total)
    return (
        <>
            <h4>Summery</h4>
            <div className="card">
                <div className="card-header text-center">Summery</div>
                <div className="row px-2">
                    <div  class="col-6">
                        <strong>item</strong>
                    </div>
                    <div  class="col-3 text-center">
                        <strong>quantity</strong>
                    </div>
                    <div class="col-3 text-right">
                        <strong>cost</strong>
                    </div>
                </div>
                {
                    cart.length ?
                    cart.map(item => {
                        return(
                            <div className="row px-2" key={item._id}>
                                <div  class="col-6">
                                    {item.name}
                                </div>
                                <div  class="col-3 text-center">
                                    {item.count}
                                </div>
                                <div class="col-3 text-right">
                                    {item.salesPrice}
                                </div>
                            </div>
                        )
                    }) :
                    null
                }
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <strong>Total cost</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong>
                            {
                                total
                            }
                            </strong>
                        </div>
                    </div>
                </div>
                <div className="card-header text-right">
                    <button className="btn btn-primary m-2" disabled={total > 0 ? false : true} onClick={purchaseHandle}>purchase</button>
                </div>
            </div>
        </>
    );
};

export default CartCalculate;