import { ReactNode, Reducer } from "react"

export enum ReducersCases {
    SET_USER_INFO = "SET_USER_INFO",
    SET_NEW_USER = "SET_NEW_USER",
}

export type IUserProfile = {
    id?:string
    name: string | null
    email: string | null | undefined
    profileImage: string | null
    status: string | null

}


export interface IInitialState {
    userInfo: undefined;
    newUser: boolean
}
console.log(
    ReducersCases.SET_USER_INFO,
    ReducersCases.SET_NEW_USER,
)
export type UserActions =
    | {
        type: ReducersCases.SET_USER_INFO,
        userInfo: IUserProfile
    }
    | {
        type: ReducersCases.SET_NEW_USER,
        newUser: boolean
    } ;

export interface UserState {
    userInfo: IUserProfile
    newUser: boolean | undefined
}

export interface IStateProvider {
    initialState: IInitialState
    reducer: Reducer<UserState, UserActions>
    children: ReactNode
}
