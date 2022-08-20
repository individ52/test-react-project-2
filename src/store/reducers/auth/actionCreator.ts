import { AppDispatch } from "../..";
import { UserService } from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { removeUserLocalStorage, setUserLocalStorage } from "../../../utils/userLocalStorage";
import { AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingrAction, SetSuccessAction, SetUserAction } from "./type";

export const AuthActionCreators = {
    setUser: (payload: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload }),
    setIsAuth: (payload: boolean): SetIsAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingrAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    setSuccess: (payload: string): SetSuccessAction => ({ type: AuthActionEnum.SET_SUCCESS, payload }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try {
            const response = await UserService.getUsers();
            const user = response.data.find(user => user.password == password && user.username == username);
            if (user) {
                dispatch(AuthActionCreators.setIsLoading(false));
                dispatch(AuthActionCreators.setSuccess("You are authorized!"));
                dispatch(AuthActionCreators.setUser({ password, username }));
                setUserLocalStorage(true, user.username);
                setTimeout(() => {
                    dispatch(AuthActionCreators.setIsAuth(true));
                }, 2000);
            } else {
                dispatch(AuthActionCreators.setIsLoading(false));
                dispatch(AuthActionCreators.setError("Invalid username or password!"));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setError("Server error"));
        }
        setTimeout(() => {
            dispatch(AuthActionCreators.setError(""));
        }, 2000);
    },
    logout: () => (dispatch: AppDispatch) => {
        removeUserLocalStorage();
        dispatch(AuthActionCreators.setIsAuth(false));
        dispatch(AuthActionCreators.setUser({} as IUser));
    },
    register: (user: IUser) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try {
            const response = await UserService.getUsers();
            const userData = response.data.find(userData => userData.username == user.username);
            dispatch(AuthActionCreators.setIsLoading(false));

            if (!userData) {
                await UserService.postUser(user);
                dispatch(AuthActionCreators.setSuccess("Your account is registred!"));
                dispatch(AuthActionCreators.setUser(user));
                setUserLocalStorage(true, user.username);
                setTimeout(() => {
                    dispatch(AuthActionCreators.setIsAuth(true));
                }, 2000);
            } else {
                dispatch(AuthActionCreators.setError("This username is already used!"));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setError("Server error"));
        }
        setTimeout(() => {
            dispatch(AuthActionCreators.setError(""));
            dispatch(AuthActionCreators.setSuccess(""));
        }, 2000);
    },
}