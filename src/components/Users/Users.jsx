import React from 'react';
import styles from './users.module.css'
import * as axios from "axios";
import userPhoto from '../../assets/user.png'

class User extends React.Component {

    getUsers = () => {
        return this.props.users;
    };


    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    componentWillUnmount() {
        alert("Component will be unmount");
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        alert("Component was updated");
    }

    render = () => {
        return (
            <div>
                {
                    this.props.users.map(u => {
                        return <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
                        </div>
                        <div>
                            {
                                u.followed ?
                                    <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                    :
                                    <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
}

export default User;