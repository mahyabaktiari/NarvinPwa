import React, { useContext, useReducer } from "react";

const BuyNetState = React.createContext();
const BuyNetDispatch = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "GET_PKG_INFO":
      return {
        ...state,
        packageInfo: action.payload,
        confirmPayModal: true,
      };
    case "BUY_PKG_INIT":
      return { ...state, finializedPay: true };
    case "BUY_PKG_REFUSE":
      return { ...state, finializedPay: false, confirmPayModal: false };
    case "HOURLY_SELECT":
      return {
        ...state,
        hourly: true,
        daily: false,
        weekly: false,
        monthly: false,
        yearly: false,
        netGroupId: "1",
      };
    case "DAILY_SELECT":
      return {
        ...state,
        hourly: false,
        daily: true,
        weekly: false,
        monthly: false,
        yearly: false,
        netGroupId: "2",
      };
    case "WEEKLY_SELECT":
      return {
        ...state,
        hourly: false,
        daily: false,
        weekly: true,
        monthly: false,
        yearly: false,
        netGroupId: "3",
      };
    case "MONTHLY_SELECT":
      return {
        ...state,
        hourly: false,
        daily: false,
        weekly: false,
        monthly: true,
        yearly: false,
        netGroupId: "4",
      };
    case "YEARLY_SELECT":
      return {
        ...state,
        hourly: false,
        daily: false,
        weekly: false,
        monthly: false,
        yearly: true,
        netGroupId: "5",
      };

    default:
      return state;
  }
}

function BuyNetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    packageInfo: [],
    confirmPayModal: false,
    finializedPay: false,
    hourly: true,
    daily: false,
    weekly: false,
    monthly: false,
    yearly: false,
    netGroupId: "1",
  });

  return (
    <BuyNetState.Provider value={state}>
      <BuyNetDispatch.Provider value={dispatch}>
        {children}
      </BuyNetDispatch.Provider>
    </BuyNetState.Provider>
  );
}

function useBuyNetState() {
  const context = useContext(BuyNetState);
  if (context === undefined) {
    throw new Error("useBuyNetState must be used within a BuyNetProvider");
  }
  return context;
}
function useBuyNetDispatch() {
  const context = useContext(BuyNetDispatch);
  if (context === undefined) {
    throw new Error("useBuyNetDispatch must be used within a BuyNetProvider");
  }
  return context;
}

export { BuyNetProvider, useBuyNetDispatch, useBuyNetState };
