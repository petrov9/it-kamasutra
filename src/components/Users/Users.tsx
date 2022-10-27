import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersSuperSelector
} from "../../redux/users-selectors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {}

type QueryParamsType = {
    term?: string,
    friend?: string,
    page?: string,
}

export const Users: React.FC<PropsType> = () => {

    const users = useSelector(getUsersSuperSelector)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector(getPortionSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        const parsedUrlQuery = queryString.parse(history.location.search.substring(1)) as QueryParamsType;

        let actualPage = parsedUrlQuery.page ? Number(parsedUrlQuery.page) : currentPage
        let actualFilter = filter;

        debugger;

        if (!!parsedUrlQuery.term) actualFilter = {...actualFilter, term: parsedUrlQuery.term as string}
        if (!!parsedUrlQuery.friend) actualFilter = {
            ...actualFilter,
            friend: parsedUrlQuery.friend === "null" ? null : parsedUrlQuery.friend === "true"
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)


        history.push({
            pathname: "/developers",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followWrapper = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowWrapper = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>

            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalItemsCount={totalUsersCount} portionSize={portionSize}/>

            <div>
                {
                    users.map(u => <User key={u.id} user={u}
                                         follow={followWrapper}
                                         unfollow={unfollowWrapper}
                                         followingInProgress={followingInProgress}
                    />)
                }
            </div>
        </div>
    );
}