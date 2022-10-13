import {AuthAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const UNFOLLOW = "UNFOLLOW";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


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

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const getAuthUserData = () => (dispatch) => {
    AuthAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
}

export const login = (email, password, rememberMe) => (dispatch) => {
    AuthAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            console.log(data.messages[0]);
        }
    });
}

export const logout = () => (dispatch) => {
    AuthAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
}

export default authReducer;




