import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    const [count, setCount] = useState({'product': 0, 'sales': 0})

    useEffect(() => {
        fetch('http://localhost:5000/general/getCount', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
        })
        .then(res => res.json())
        .then(data => {
            setCount({'product': data.productCount, 'sales': data.invoiceCount})
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                </div>
                <h1 className="text-center">Welcome to Admin Panel</h1>
                <div className="row justify-content-center">
                    <div className="col-4 text-center">
                        <div className="border rounded p-5">
                            <h4>Total Product: {count.product}</h4>
                            <Link className="nav-link" to="/viewProduct">Check All Products</Link>
                        </div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="border rounded p-5">
                            <h4>Total sale: {count.sales}</h4>
                            <Link className="nav-link" to="/saleRecord">Check Sales Record</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;