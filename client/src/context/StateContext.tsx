import {
  UserActions,
  UserState,
} from "@/types/types";

import React, {
  type ReactNode,
  Dispatch,
  createContext,
  useContext,
  useReducer,
} from "react";
import { initialState } from "./StateReducers";

interface IStateContextValue {
  state: UserState;
  dispatch: Dispatch<UserActions>;
}


const initialContexValue: IStateContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const StateContext =
  createContext<IStateContextValue>(initialContexValue);

export const StateProvider: React.FC<{
  initialState: UserState;
  reducer: (state: UserState, action: UserActions) => UserState;
  children: ReactNode;
}> = ({ initialState, reducer, children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
