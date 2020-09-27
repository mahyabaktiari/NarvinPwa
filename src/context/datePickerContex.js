import React, { useContext, useReducer } from "react";

const DateState = React.createContext();
const DateDispatch = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "DATE_SELECTED":
      return { date: action.date };
    case "RESET":
      return { date: 0 };
    default:
      return state;
  }
}

function DateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    date: 0,
  });

  return (
    <DateState.Provider value={state}>
      <DateDispatch.Provider value={dispatch}>{children}</DateDispatch.Provider>
    </DateState.Provider>
  );
}

function useDateState() {
  const context = useContext(DateState);
  if (context === undefined) {
    throw new Error("useDateState must be used within a DateProvider");
  }
  return context;
}
function useDateDispatch() {
  const context = useContext(DateDispatch);
  if (context === undefined) {
    throw new Error("useDateDispatch must be used within a DateProvider");
  }
  return context;
}

export { DateProvider, useDateState, useDateDispatch };
