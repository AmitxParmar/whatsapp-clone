import {
  IInitialState,
  IStateProvider,
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

interface IStateContextValue {
  state: UserState | IInitialState;
  dispatch: Dispatch<UserActions>;
}

const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
};
const initialContexValue: IStateContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const StateContext =
  createContext<IStateContextValue>(initialContexValue);

export const StateProvider: React.FC<{
  initialState: IInitialState;
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
