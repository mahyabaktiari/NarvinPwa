import React, { useReducer, createContext, useContext } from "react";

const BuyChargeContext = createContext();
const BuyChargeDispatch = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_PAY_MODAL":
      return { ...state, payModal: true };
    case "CLOSE_PAY_MODAL":
      return { ...state, payModal: false };
    case "OPEN_FAVE_MODAL":
      return { ...state, faveModal: true };
    case "CLOSE_FAVE_MODAL":
      return { ...state, faveModal: false };
    case "IS_MTN":
      return {
        ...state,
        isMtn: true,
        isRTL: false,
        isMci: false,
        operator: "ایرانسل",
      };
    case "IS_MCI":
      return {
        ...state,
        isMci: true,
        isRTL: false,
        isMtn: false,
        operator: "همراه اول",
      };
    case "IS_RIGHTEL":
      return {
        ...state,
        isRTL: true,
        isMtn: false,
        isMci: false,
        operator: "رایتل",
      };
    case "RESET_SIMS":
      return {
        ...state,
        isRTL: false,
        isMtn: false,
        isMci: false,
        operator: "",
        number: "",
      };
    case "NUM_CHANGED":
      return {
        ...state,
        number: action.payload,
        faveModal: false,
        contactSelect: false,
        contact: [],
      };
    case "NUM_EMPTY":
      return {
        ...state,
        number: "",
      };
    case "CONTACT_SELECT_INIT":
      return {
        ...state,
        contactSelect: true,
      };
    case "CONTACT_DATA":
      return {
        ...state,
        contact: action.payload,
        contactSelect: true,
      };
    default:
      return state;
  }
}

function ChargeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    payModal: false,
    faveModal: false,
    isMci: false,
    isMtn: false,
    isRTL: false,
    isTla: false,
    operator: "",
    number: "",
    contact: [],
    contactSelect: false,
  });
  return (
    <BuyChargeContext.Provider value={state}>
      <BuyChargeDispatch.Provider value={dispatch}>
        {children}
      </BuyChargeDispatch.Provider>
    </BuyChargeContext.Provider>
  );
}
function useChargeContext() {
  const context = useContext(BuyChargeContext);
  if (context === undefined) {
    throw new Error("useChargeContext must be used within a chargeProvider");
  }
  return context;
}
function useChargeDispatch() {
  const context = useContext(BuyChargeDispatch);
  if (context === undefined) {
    throw new Error("useChargeDispatch must be used within a chargeProvider");
  }
  return context;
}

export { ChargeProvider, useChargeContext, useChargeDispatch };
