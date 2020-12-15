import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App';

const TopBar = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
    
    const logoutHandle = () => {
        localStorage.clear();
        dispatch({type:"CLEAR"});
        history.push('/login');
    }
    return (
        <>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">POS Application</Link>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <button className="link-btn" onClick={logoutHandle}>logout</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default TopBar;