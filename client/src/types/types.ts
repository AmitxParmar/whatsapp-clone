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


export interface IInitialState {
    userInfo: undefined ;
    newUser: boolean
}

export type UserActions =
    | {
        type: ReducerCases.SET_USER_INFO,
        payload: IUserProfile 
    }
    | {
        type: ReducerCases.SET_NEW_USER,
        payload: {
            newUser: boolean
        }
    };

export interface UserState {
    userInfo: IUserProfile | undefined
    newUser: boolean | undefined
}

export interface IStateProvider {
    initialState: IInitialState
    reducer: Reducer<UserState, UserActions>
    children: ReactNode
}
