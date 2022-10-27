import {ApiResponseType, ResultCode} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {InferActionTypes, BaseThunkType} from "./redux-store";
import {Dispatch} from "react";
import {UsersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    portionSize: 10,
    isFetching: true,
    followingInProgress: [] as Array<number>
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case "SN/USERS/SET_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        case "SN/USERS/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };

        case "SN/USERS/SET_FILTER": {
            return {
                ...state,
                filter: action.payload
            }
        }
        case "SN/USERS/SET_USERS_TOTAL_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case "SN/USERS/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
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
    followSuccess: (userId: number) => ({type: "SN/USERS/FOLLOW", userId}) as const,
    unfollowSuccess: (userId: number) => ({type: "SN/USERS/UNFOLLOW", userId}) as const,
    setUsers: (users: Array<UserType>) => ({type: "SN/USERS/SET_USERS", users}) as const,
    setCurrentPage: (currentPage: number) => ({type: "SN/USERS/SET_CURRENT_PAGE", currentPage}) as const,
    setFilter: (filter: FilterType) => ({type: "SN/USERS/SET_FILTER", payload: filter}) as const,
    setTotalUserCount: (totalCount: number) => ({type: "SN/USERS/SET_USERS_TOTAL_COUNT", totalCount}) as const,
    toggleIsFetching: (isFetching: boolean) => ({type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching}) as const,
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId
    }) as const
}

export const requestUsers = (requestPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(requestPage));
        dispatch(actions.setFilter(filter));
        dispatch(actions.toggleIsFetching(true));

        let data = await UsersAPI.getUsers(requestPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUserCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
                                   apiMethod: (userId: number) => Promise<ApiResponseType>, actionCreator: (userId: number) => ActionTypes) => {
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
    return async (dispatch) => {
        let apiMethod = UsersAPI.unfollow.bind(UsersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
}

export default usersReducer;

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type DispatchType = Dispatch<ActionTypes>
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>;