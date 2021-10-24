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
                ...action.data,
                isAuth: true
            };
        default:
            return state;
    }

    return state;
}

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const setAuthUserData = (userId, email, login) => {
    return {type: SET_USER_DATA, data: {userId, email, login}}
}

export const getAuthUserData = () => (dispatch) => {
    AuthAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login));
        }
    });
}

export default authReducer;




