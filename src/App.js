import React, { Component, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import { DateProvider } from "./context/datePickerContex";
import { AppProvider } from "./context/appContext";
import ConfirmCode from "./views/ConfirmCode/ConfirmCode";
import RouteInitial from "./routes/RouteInitial";
import { ChargeProvider } from "./context/buyChargeContext";
import { BuyNetProvider } from "./context/buyNetContext";
import { BusProvider } from "./context/busContext";
import { PayProvider } from "./context/payContex";
import { MapProvider } from "./context/mapContext";
import "./App.css";

const App = () => {
  return (
    <>
      <PayProvider>
        <AppProvider>
          <BuyNetProvider>
            <ChargeProvider>
              <DateProvider>
                <BusProvider>
                  <MapProvider>
                    <RouteInitial />
                  </MapProvider>
                </BusProvider>
              </DateProvider>
            </ChargeProvider>
          </BuyNetProvider>
        </AppProvider>
      </PayProvider>
    </>
  );
};
export default App;
