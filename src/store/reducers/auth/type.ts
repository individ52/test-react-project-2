import { IUser } from "../../../models/IUser";

export interface AuthState {
    user: IUser;
    isAuth: boolean;
    error: string;
    success: string;
    isLoading: boolean;
}

export enum AuthActionEnum {
    SET_USER = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_SUCCESS = "SET_SUCCESS",
    SET_IS_LOADING = "SET_IS_LOADING"
}


export interface SetUserAction {
    type: AuthActionEnum.SET_USER,
    payload: IUser
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR,
    payload: string
}
export interface SetSuccessAction {
    type: AuthActionEnum.SET_SUCCESS,
    payload: string
}

export interface SetIsAuthAction {
    type: AuthActionEnum.SET_IS_AUTH,
    payload: boolean
}

export interface SetIsLoadingrAction {
    type: AuthActionEnum.SET_IS_LOADING,
    payload: boolean
}

export type AuthActions =
    SetUserAction |
    SetErrorAction |
    SetSuccessAction |
    SetIsAuthAction |
    SetIsLoadingrAction 