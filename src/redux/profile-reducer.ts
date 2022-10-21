import {ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null,
    status: string
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => {return {type: ADD_POST, newPostText}}

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => {return {type: DELETE_POST, postId}}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {return {type: SET_USER_PROFILE, profile}}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusActionType => {return {type: SET_STATUS, status}}

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {return {type: SAVE_PHOTO_SUCCESS, photos}}


export const getProfile = (userId: number) => async (dispatch: any) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
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

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await ProfileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {

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