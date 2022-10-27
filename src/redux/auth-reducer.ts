import {ResultCode, ResultCodeForCaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {AuthAPI} from "../api/auth-api";
import {SecurityAPI} from "../api/security-api";
import {BaseThunkType, InferActionTypes} from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: true as boolean,
    isAuth: false as boolean,
    captchaUrl: null as string | null // if null, then captcha is not required
};

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/auth/SET_USER_DATA":
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }

    return state;
}

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({type: "SN/auth/SET_USER_DATA", payload: {userId, email, login, isAuth}}) as const,
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: "SN/auth/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}}) as const
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await AuthAPI.authMe();

    if (data.resultCode === ResultCode.Success) {
        let {id, email, login} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {

    let response = await AuthAPI.login(email, password, rememberMe, captcha);

    // @ts-ignore
    if (response.resultCode === ResultCode.Success) {
        dispatch(getAuthUserData());
    } else {

        // @ts-ignore
        if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        // @ts-ignore
        let action = stopSubmit("login", {_error: response.messages.length > 0 ? response.messages[0] : ""});
        dispatch(action);
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let data = await AuthAPI.logout();

    if (data.resultCode === ResultCode.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await SecurityAPI.getCaptchaUrl();

    const captchaUrl = response.data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>;