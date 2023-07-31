import { ReactNode, Reducer } from "react"

export enum ReducersCases {
    SET_USER_INFO = "SET_USER_INFO",
    SET_NEW_USER = "SET_NEW_USER",
    SET_CONTACT_PAGE = "SET_CONTACT_PAGE",
    CHANGE_CURRENT_CHAT_USER = "CHANGE_CURRENT_CHAT_USER"
}

export type IUserProfile = {
    id?: string
    name: string | null
    email: string | null | undefined
    profilePicture: string | null
    about: string | null
}

export type UserActions =
    |
    {
        type: ReducersCases.SET_USER_INFO,
        userInfo: IUserProfile
    }
    |
    {
        type: ReducersCases.SET_NEW_USER,
        newUser: boolean
    }
    |
    {
        type: ReducersCases.SET_CONTACT_PAGE,
        contactsPage?: boolean
    }
    |
    {
        type: ReducersCases.CHANGE_CURRENT_CHAT_USER,
        user: IUserProfile
    };

export interface UserState {
    userInfo: IUserProfile
    newUser: boolean | undefined | null
    contactsPage: boolean | undefined | null
    currentChatUser: IUserProfile | null | undefined
}

export interface IStateProvider {
    initialState: UserState
    reducer: Reducer<UserState, UserActions>
    children: ReactNode
}
