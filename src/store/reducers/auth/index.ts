import { createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, AuthActions, AuthState } from "./type";


const initialState: AuthState = {
    error: "",
    isAuth: false,
    isLoading: false,
    success: "",
    user: {} as IUser
};

export default function AuthReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionEnum.SET_USER:
            return { ...state, user: action.payload }
        case AuthActionEnum.SET_ERROR:
            return { ...state, error: action.payload }
        case AuthActionEnum.SET_SUCCESS:
            return { ...state, success: action.payload }
        case AuthActionEnum.SET_IS_AUTH:
            return { ...state, isAuth: action.payload }
        case AuthActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default: return state;
    }
}