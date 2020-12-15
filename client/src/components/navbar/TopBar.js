import React from 'react';
import {Link} from 'react-router-dom'

const TopBar = () => {
    return (
        <>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">POS Application</Link>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <button className="link-btn">logout</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default TopBar;