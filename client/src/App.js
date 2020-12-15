import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import AddProduct from './components/addProduct/AddProduct'
import ViewProduct from "./components/viewProduct/ViewProduct";
import Sales from "./components/sales/Sales";
import SalesRecord from "./components/salesRecord/SalesRecord";
import Login from "./components/login/Login";

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
