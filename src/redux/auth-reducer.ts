import {AuthAPI, SEcurityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: true as boolean,
    isAuth: false as boolean,
    captchaUrl: null as string | null // if null, then captcha is not required
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }

    return state;
}

type SetAuthUserDataActionTypePayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionTypePayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string
    }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}}

export const getAuthUserData = () => async (dispatch: any) => {
    let data = await AuthAPI.authMe();

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {

    let data = await AuthAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {

        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let action = stopSubmit("login", {_error: data.messages.map((e: string) => e)});
        dispatch(action);
    }
}

export const logout = () => async (dispatch: any) => {
    let data = await AuthAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await SEcurityAPI.getCaptchUrl();

    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;




