import {ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: 5, message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost]};

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.status};

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)};

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};

        default:
            return state;
    }

    return state;
}

export const addPost = (newPostText) => {return {type: ADD_POST, newPostText}}
export const deletePost = (postId) => {return {type: DELETE_POST, postId}}
export const setUserProfile = (profile) => {return {type: SET_USER_PROFILE, profile}}
export const setStatus = (status) => {return {type: SET_STATUS, status}}
export const savePhotoSuccess = (photos) => {return {type: SAVE_PHOTO_SUCCESS, photos}}


export const getProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        let response = await ProfileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        } else if (response.data.resultCode === 1) { // wrong status

        }
    } catch (error) {
        //
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await ProfileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {

    const userId = getState().auth.userId;
    let response = await ProfileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        const errorMessage = response.data.messages[0];
        let action = stopSubmit("edit-profile", {_error: errorMessage});
        dispatch(action);
        return Promise.reject(errorMessage);
    }
}


export default profileReducer;