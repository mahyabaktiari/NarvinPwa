import React, { useContext, useReducer } from "react";

const BusState = React.createContext();
const BusDispatch = React.createContext();

function reducer(state, action) {
  console.log(action.seatRequestGender, action.seatRequest);
  switch (action.type) {
    case "Select":
      return {
        ...state,
        counter: action.counter,
        selected: true,
        seatRequest: state.seatRequest.filter((seat) => {
          return seat !== action.seatRequest;
        }),
        seatRequestGender: state.seatRequestGender.filter((seat) => {
          return seat !== action.seatRequestGender;
        }),
      };
    case "No_Select":
      return {
        ...state,
        counter: action.counter,
        selected: false,
        seatRequest: [...state.seatRequest, action.seatRequest],
        seatRequestGender: [
          ...state.seatRequestGender,
          action.seatRequestGender,
        ],
      };
    case "New_select":
      return {
        ...state,
        counter: action.counter,
        seatRequest: action.seatRequest,
        seatRequestGender: action.seatRequestGender,
      };
    default:
      return state;
  }
}

function BusProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    selected: false,
    counter: 0,
    seatRequest: [],
    seatRequestGender: [],
  });

  return (
    <BusState.Provider value={state}>
      <BusDispatch.Provider value={dispatch}>{children}</BusDispatch.Provider>
    </BusState.Provider>
  );
}

function useBusState() {
  const context = useContext(BusState);
  if (context === undefined) {
    throw new Error("useBusState must be used within a BusProvider");
  }
  return context;
}
function useBusDispatch() {
  const context = useContext(BusDispatch);
  if (context === undefined) {
    throw new Error("useBusDispatch must be used within a BusProvider");
  }
  return context;
}

export { BusProvider, useBusState, useBusDispatch };
