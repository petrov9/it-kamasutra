import {ResultCode, UsersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "react";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

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
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type ActionTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalUserCountType
    | ToggleIsFetchingType | ToggleFollowingProgressType


type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => {
    return {type: FOLLOW, userId}
}

type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => {
    return {type: UNFOLLOW, userId}
}

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => {
    return {type: SET_USERS, users}
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

type SetTotalUserCountType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    totalCount: number
}
export const setTotalUserCount = (totalCount: number): SetTotalUserCountType => {
    return {type: SET_USERS_TOTAL_COUNT, totalCount}
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const requestUsers = (requestPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(setCurrentPage(requestPage));
        dispatch(toggleIsFetching(true));

        let data = await UsersAPI.getUsers(requestPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCode.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = UsersAPI.follow.bind(UsersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let apiMethod = UsersAPI.unfollow.bind(UsersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
    }
}

export default usersReducer;