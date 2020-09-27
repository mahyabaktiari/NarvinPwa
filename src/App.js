import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import { DateProvider } from "./context/datePickerContex";
import ConfirmCode from "./views/ConfirmCode/ConfirmCode";
import RouteInitial from "./routes/RouteInitial";
import "./App.css";

const App = () => {
  return (
    <>
      <DateProvider>
        <RouteInitial />
      </DateProvider>

      {/* <Register /> */}
      {/* <ConfirmCode /> */}
      {/* <RouteInitial /> */}
    </>
  );
};
export default App;
