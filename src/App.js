import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import ConfirmCode from './views/ConfirmCode/ConfirmCode';
import RouteInitial from './routes/RouteInitial'

const App = () => {
  return(<div>
  
    <RouteInitial/>
 
  {/* <Register /> */}
{/* <ConfirmCode /> */}
{/* <RouteInitial /> */}

  </div>)
}
export default App;
