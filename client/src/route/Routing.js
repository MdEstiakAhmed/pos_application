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
import UpdateProduct from '../components/updateProduct/UpdateProduct';
import ViewInvoice from '../components/invoice/ViewInvoice';
import UpdateInvoice from '../components/invoice/UpdateInvoice';
import InvoicePage from '../components/invoice/InvoicePage';



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
            <Route exact path="/upDateProduct/:id">
                <Dashboard children={<UpdateProduct/>}/>
            </Route>
            <Route exact path="/viewProduct">
                <Dashboard children={<ViewProduct/>}/>
            </Route>
            <Route exact path="/sale">
                <Dashboard children={<Sales/>}/>
            </Route>
            <Route exact path="/saleRecord">
                <Dashboard children={<ViewInvoice/>}/>
            </Route>
            <Route exact path="/invoiceInfo/:id">
                <Dashboard children={<InvoicePage/>}/>
            </Route>
            <Route exact path="/updateInvoice/:id">
                <Dashboard children={<UpdateInvoice/>}/>
            </Route>
            <Route exact path="/">
                <Dashboard children={<Home/>}/>
            </Route>
        </Switch>
    );
}

export default Routing;