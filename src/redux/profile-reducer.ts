import {ResultCode} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ProfileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionTypes} from "./redux-store";

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
            let newPost = {id: 5, message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost]};

        case "SN/PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile};

        case "SN/PROFILE/SET_STATUS":
            return {...state, status: action.status};

        case "SN/PROFILE/DELETE_POST":
            return {...state, posts: state.posts.filter(p => p.id != action.postId)};

        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType };

        default:
            return state;
    }

    return state;
}

export const actions = {
    addPost:(newPostText: string) => ({type: "SN/PROFILE/ADD-POST", newPostText}) as const,
    deletePost:(postId: number) => ({type: "SN/PROFILE/DELETE_POST", postId}) as const,
    setUserProfile:(profile: ProfileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile}) as const,
    setStatus:(status: string) => ({type: "SN/PROFILE/SET_STATUS", status}) as const,
    savePhotoSuccess:(photos: PhotosType) => ({type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", photos}) as const
}


export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await ProfileAPI.updateStatus(status);
        // @ts-ignore
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setStatus(status));
            // @ts-ignore
        } else if (data.resultCode === ResultCode.Error) { // wrong status

        }
    } catch (error) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.savePhoto(file);

    // @ts-ignore
    if (data.resultCode === ResultCode.Success) {
        // @ts-ignore
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {

    const userId = getState().auth.userId
    let data = await ProfileAPI.saveProfile(profile);

    // @ts-ignore
    if (data.resultCode === ResultCode.Success) {
        if (userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        // @ts-ignore
        const errorMessage = data.messages[0];
        let action = stopSubmit("edit-profile", {_error: errorMessage});
        dispatch(action);
        return Promise.reject(errorMessage);
    }
}

export default profileReducer;

type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null,
    status: string
}
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>