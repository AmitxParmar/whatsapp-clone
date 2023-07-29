import { UserActions,ReducersCases, IInitialState, UserState } from "@/types/types";

export const initialState: IInitialState = {
  userInfo: undefined,
  newUser: false,
};

const reducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case ReducersCases.SET_USER_INFO:
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo))
      console.log('from reducer saved userInfo firebase!!', action.userInfo);
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case ReducersCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    default:
      return state;
  }
};

export default reducer;
