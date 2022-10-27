import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import {InitialStateType} from "../../redux/sidebar-reducer";

type PropsType = {
    sidebarPage: InitialStateType
}

const Navbar: React.FC<PropsType> = (props) => {
    let friends = props.sidebarPage.friends.map(e => {
        return <div key={e.id} className={s.friend}>
            <img src={e.avatarImage}/>
            <div>{e.name}</div>
        </div>;
    })

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.active}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/developers" activeClassName={s.active}>
                    Developers
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.active}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.active}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/settings" activeClassName={s.active}>
                    Settings
                </NavLink>
            </div>
            <br/>
            <div className={s.item}>
                Friends
                <div className={s.friends}>
                    {friends}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;