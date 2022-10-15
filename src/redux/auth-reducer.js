import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }

    return state;
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const getAuthUserData = () => async (dispatch) => {
    let data = await AuthAPI.authMe();

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {

    let data = await AuthAPI.login(email, password, rememberMe);

    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
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

export default authReducer;




