import { ReactNode, Reducer } from "react"

export enum ReducerCases {
    SET_USER_INFO = "SET_USER_INFO",
    SET_NEW_USER = "SET_NEW_USER",
}

export type IUserProfile = {
    name: string
    email: number
    profileImage: string
    status: string
}
type INewUser = {
    newUser: boolean
}

export interface IInitialState {
    userInfo: IUserProfile | undefined ;
    newUser: boolean
}

export type UserActions =
    | { type: ReducerCases.SET_USER_INFO, payload: IUserProfile }
    | { type: ReducerCases.SET_NEW_USER, payload: INewUser };

export type UserState = {
    userInfo: IUserProfile
    newUser: INewUser
}

export interface IStateProvider {
    initialState: IInitialState
    reducer: Reducer<UserState, UserActions>
    children: ReactNode
}
