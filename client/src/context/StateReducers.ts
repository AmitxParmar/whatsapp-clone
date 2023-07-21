import { ReducerCases, UserActions, IInitialState, UserState } from "@/types/types";


export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
};

const reducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case ReducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ReducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
