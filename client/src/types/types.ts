import { ReactNode, Reducer } from "react"

export enum ReducerCases {
    SET_USER_INFO = "SET_USER_INFO",
    SET_NEW_USER = "SET_NEW_USER",
}

export type IUser = {
    name: string
    email: number
    profileImage: string
    status: "Available"
}
type INewUser = {
    newUser: boolean
}

export interface IInitialState {
    userInfo: IUser | undefined | null;
    newUser: boolean
}

export type UserActions = { type: ReducerCases, payload: { profileImage: string, name: string, email: string, status: "Available" } }
    | { type: ReducerCases, payload: { newUser: boolean } };

export type UserState = {
    state: IUser | INewUser
}

export interface IStateProvider {
    initialState: IInitialState
    reducer: Reducer<IUser | INewUser, ReducerCases>
    children: ReactNode
}

/* export interface UserContext { 
    initialState: IInitialState
    re
} */