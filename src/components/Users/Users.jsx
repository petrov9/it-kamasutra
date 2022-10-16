import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, portionSize, users, ...props}) => {

    return (
        <div>
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