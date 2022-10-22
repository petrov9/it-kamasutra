import {ResultCode, UsersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux-store";
import {Dispatch} from "react";

type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    portionSize: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "SET_USERS_TOTAL_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        default:
            return state;
    }

    return state;
}

export const actions = {
    followSuccess: (userId: number) => ({type: "FOLLOW", userId}) as const,
    unfollowSuccess: (userId: number) => ({type: "UNFOLLOW", userId}) as const,
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users}) as const,
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage}) as const,
    setTotalUserCount: (totalCount: number) => ({type: "SET_USERS_TOTAL_COUNT", totalCount}) as const,
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching}) as const,
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId}) as const
}


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type ActionTypes = InferActionTypes<typeof actions>

export const requestUsers = (requestPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(requestPage));
        dispatch(actions.toggleIsFetching(true));

        let data = await UsersAPI.getUsers(requestPage, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUserCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCode.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = UsersAPI.follow.bind(UsersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let apiMethod = UsersAPI.unfollow.bind(UsersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
}

export default usersReducer;