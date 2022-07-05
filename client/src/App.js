import React, { createContext, useReducer} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {initialState, reducer} from './reducers/UserReducer';
import Routing from './route/Routing';
import './App.css';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer,initialState);
  console.log("test")
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Routing/>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
