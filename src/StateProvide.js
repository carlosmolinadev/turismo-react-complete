import React, { createContext, useContext, useReducer } from "react";

//THIS COMPONENT IS PREPARING THE GLOBAL STATE
export const StateContext = createContext();

//this allow us to wrap index.js
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
