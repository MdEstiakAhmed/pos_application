import React from 'react';
import {Link} from 'react-router-dom'

const LeftBar = () => {
    return (
        <>
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">
                                Dashboard <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addProduct">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/viewProduct">All Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sale">Sales</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/saleRecord">Sales Record</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default LeftBar;