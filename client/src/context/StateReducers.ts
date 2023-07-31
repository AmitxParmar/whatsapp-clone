import { UserActions, ReducersCases, UserState } from "@/types/types";

export const initialState: UserState = {
  // Define your initial state properties here
  userInfo: {
    name: "",
    email: "",
    profilePicture: "",
    about: "",
  },
  newUser: null,
  contactsPage: false,
  currentChatUser: undefined
};

type Reducer<S, A> = (state: S, action: A) => S;

const reducer: Reducer<UserState, UserActions> = (state, action: UserActions) => {
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
    case ReducersCases.SET_CONTACT_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      }
    case ReducersCases.CHANGE_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user
      }
    default:
      return state;
  }
};

export default reducer;
