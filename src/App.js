import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import ConfirmCode from "./views/ConfirmCode/ConfirmCode";
import RouteInitial from "./routes/RouteInitial";
import "./App.css";

const App = () => {
  return (
    <>
      <RouteInitial />

      {/* <Register /> */}
      {/* <ConfirmCode /> */}
      {/* <RouteInitial /> */}
    </>
  );
};
export default App;
