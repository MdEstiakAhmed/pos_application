import React, { useEffect, useContext} from 'react';
import {
    Switch,
    Route,
    useHistory
  } from "react-router-dom";
import {UserContext} from '../App';

import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/home/Home';
import AddProduct from '../components/addProduct/AddProduct'
import ViewProduct from "../components/viewProduct/ViewProduct";
import Sales from "../components/sales/Sales";
import SalesRecord from "../components/salesRecord/SalesRecord";
import Login from "../components/login/Login";



const Routing = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        dispatch({type: "USER", payload: user});
        history.push('/');
      }
      else{
        history.push('/login');
      }
    }, [])

    return(
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/addProduct">
                <Dashboard children={<AddProduct/>}/>
            </Route>
            <Route exact path="/viewProduct">
                <Dashboard children={<ViewProduct/>}/>
            </Route>
            <Route exact path="/sale">
                <Dashboard children={<Sales/>}/>
            </Route>
            <Route exact path="/saleRecord">
                <Dashboard children={<SalesRecord/>}/>
            </Route>
            <Route exact path="/">
                <Dashboard children={<Home/>}/>
            </Route>
        </Switch>
    );
}

export default Routing;