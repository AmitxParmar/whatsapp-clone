import { IUserProfile, UserState } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        name: "",
        email: "",
        profilePicture: "",
        about: "",
    },
    newUser: null,
    contactsPage: false,
    currentChatUser: null,
    messages: [],
} as UserState;

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserProfile>) => {
            state.userInfo = action.payload
            /*  if (action.payload) {
                 localStorage.setItem("userInfo", JSON.stringify(action.payload));
                 state.userInfo = action.payload;
             } else {
                 const loggedInUser = localStorage.getItem("userInfo");
                 state.userInfo = loggedInUser ? JSON.parse(loggedInUser) : {};
             } */
        },
        setNewUser: (state, action) => {
            state.newUser = action.payload;
        },
        setContactPage: (state): void => {
            state.contactsPage = !state.contactsPage;
        },
        changeCurrentChatUser: (state, action) => {
            state.currentChatUser = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const {
    setUserInfo,
    setNewUser,
    setContactPage,
    changeCurrentChatUser,
    setMessages,
} = mainSlice.actions;

export default mainSlice.reducer;