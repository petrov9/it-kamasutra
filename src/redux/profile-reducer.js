import {ProfileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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

        default:
            return state;
    }

    return state;
}

export const addPost = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    };
}

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    };
}

export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile};
}
export const setStatus = (status) => {
    return {type: SET_STATUS, status};
}
export const getProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await ProfileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}


export default profileReducer;