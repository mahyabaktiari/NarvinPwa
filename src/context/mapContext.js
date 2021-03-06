import React, { useContext, useReducer } from "react";

const MapState = React.createContext();
const MapDispatch = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_POSITION":
      return {
        ...state,
        coordinates: action.coordinates,
      };
    case "HIDE_MAP":
      return { ...state, mapVisible: false };
    default:
      return state;
  }
}

function MapProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    coordinates: {},
  });

  return (
    <MapState.Provider value={state}>
      <MapDispatch.Provider value={dispatch}>{children}</MapDispatch.Provider>
    </MapState.Provider>
  );
}

function useMapState() {
  const context = useContext(MapState);
  if (context === undefined) {
    throw new Error("useMapState must be used within a MapProvider");
  }
  return context;
}
function useMapDispatch() {
  const context = useContext(MapDispatch);
  if (context === undefined) {
    throw new Error("useMapDispatch must be used within a MapProvider");
  }
  return context;
}

export { MapProvider, useMapState, useMapDispatch };
