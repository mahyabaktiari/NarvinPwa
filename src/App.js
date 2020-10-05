import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import { DateProvider } from "./context/datePickerContex";
import { AppProvider } from "./context/appContext";
import ConfirmCode from "./views/ConfirmCode/ConfirmCode";
import RouteInitial from "./routes/RouteInitial";
import "./App.css";

const App = () => {
  return (
    <>
      <AppProvider>
        <DateProvider>
          <RouteInitial />
        </DateProvider>
      </AppProvider>
    </>
  );
};
export default App;
