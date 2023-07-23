import { IStateProvider } from "@/types/types";
import { createContext, useContext, useReducer } from "react";

interface IContext {
  
}
export const StateContext = createContext<>(null);

export const StateProvider: React.FC<IStateProvider> = ({
  initialState,
  reducer,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState) }>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
