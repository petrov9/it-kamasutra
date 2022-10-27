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

type PropsType = {}

export const Users: React.FC<PropsType> = () => {

    const users = useSelector(getUsersSuperSelector)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector(getPortionSize)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

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