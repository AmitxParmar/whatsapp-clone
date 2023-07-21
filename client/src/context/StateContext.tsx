import { IStateProvider } from "@/types/types";
import { createContext, useContext, useReducer } from "react";


export const StateContext = createContext<IStateProvider | null>(null);

export const StateProvider: React.FC<IStateProvider> = ({
  initialState,
  reducer,
  children,
}) => (
  <StateContext.Provider value={{ initialState, reducer, children }}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
