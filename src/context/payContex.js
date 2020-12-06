import React, { useContext, useReducer } from "react";

const PayState = React.createContext();
const PayDispatch = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_URL":
      return {
        ...state,
        url: action.url,
      };

    default:
      return state;
    // case "GET_PKG_INFO":
    //   return {
    //     ...state,
    //     packageInfo: action.payload,
    //     confirmPayModal: true,
    //   };
    // case "BUY_PKG_INIT":
    //   return { ...state, finializedPay: true };
    // case "BUY_PKG_REFUSE":
    //   return { ...state, finializedPay: false, confirmPayModal: false };
    // case "HOURLY_SELECT":
    //   return {
    //     ...state,
    //     hourly: true,
    //     daily: false,
    //     weekly: false,
    //     monthly: false,
    //     yearly: false,
    //     netGroupId: "1",
    //   };
    // case "DAILY_SELECT":
    //   return {
    //     ...state,
    //     hourly: false,
    //     daily: true,
    //     weekly: false,
    //     monthly: false,
    //     yearly: false,
    //     netGroupId: "2",
    //   };
    // case "WEEKLY_SELECT":
    //   return {
    //     ...state,
    //     hourly: false,
    //     daily: false,
    //     weekly: true,
    //     monthly: false,
    //     yearly: false,
    //     netGroupId: "3",
    //   };
    // case "MONTHLY_SELECT":
    //   return {
    //     ...state,
    //     hourly: false,
    //     daily: false,
    //     weekly: false,
    //     monthly: true,
    //     yearly: false,
    //     netGroupId: "4",
    //   };
    // case "YEARLY_SELECT":
    //   return {
    //     ...state,
    //     hourly: false,
    //     daily: false,
    //     weekly: false,
    //     monthly: false,
    //     yearly: true,
    //     netGroupId: "5",
    //   };

    // default:
    //   return state;
  }
}

function PayProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    url: "",
    // confirmPayModal: false,
    // finializedPay: false,
    //  hourly: true,
    //daily: false,
    //  weekly: false,
    //  monthly: false,
    //  yearly: false,
    // netGroupId: "1",
  });

  return (
    <PayState.Provider value={state}>
      <PayDispatch.Provider value={dispatch}>{children}</PayDispatch.Provider>
    </PayState.Provider>
  );
}

function usePayState() {
  const context = useContext(PayState);
  if (context === undefined) {
    throw new Error("usePayState must be used within a PayProvider");
  }
  return context;
}
function usePayDispatch() {
  const context = useContext(PayDispatch);
  if (context === undefined) {
    throw new Error("usePayDispatch must be used within a PayProvider");
  }
  return context;
}

export { PayProvider, usePayDispatch, usePayState };
