import {AuthAPI, SEcurityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, email, login, isAuth) => {return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}}
export const getCaptchaUrlSuccess = (captchaUrl) => {return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}}

export const getAuthUserData = () => async (dispatch) => {
    let data = await AuthAPI.authMe();

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let data = await AuthAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {

        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let action = stopSubmit("login", {_error: data.messages.map(e => e)});
        dispatch(action);
    }
}

export const logout = () => async (dispatch) => {
    let data = await AuthAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await SEcurityAPI.getCaptchUrl();

    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;




