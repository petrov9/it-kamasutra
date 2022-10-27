import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    portionSize: number
    users: Array<UserType>,
    followingInProgress: Array<number>
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
                                      currentPage,
                                      totalUsersCount,
                                      pageSize,
                                      onPageChanged,
                                      portionSize,
                                      users,
                                      ...props
                                  }) => {

    return (
        <div>

            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={pageSize} totalItemsCount={totalUsersCount} portionSize={portionSize}/>

            <div>
                {
                    users.map(u => <User key={u.id} user={u}
                                         follow={props.follow}
                                         unfollow={props.unfollow}
                                         followingInProgress={props.followingInProgress}
                    />)
                }
            </div>
        </div>
    );
}

export default Users;