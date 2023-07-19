import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={{ initialState, reducer, children }}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
