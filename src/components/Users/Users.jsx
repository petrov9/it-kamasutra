import styles from "./users.module.css";
import userPhoto from "../../assets/user.png";
import React from "react";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {
                    pages.map(p => {
                        if (p <= props.visiblePages) {
                            return <span onClick={() => {
                                props.onPageChanged(p)
                            }} className={props.currentPage === p && styles.selectedPage}>{p}</span>;
                        }
                    })
                }
            </div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                u.followed ?
                                    <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "e263faeb-fa72-4c9b-8d0c-aa4bb01df379"
                                            }
                                        })
                                            .then(response => {
                                                debugger;
                                                if (response.data.resultCode === 0) {
                                                    props.unfollow(u.id)
                                                }
                                            });
                                    }}>Unfollow</button>
                                    :
                                    <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "e263faeb-fa72-4c9b-8d0c-aa4bb01df379"
                                            }
                                        })
                                            .then(response => {
                                                debugger;
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                            });

                                    }}>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                    </div>
                })
            }
        </div>
    );
}

export default Users;