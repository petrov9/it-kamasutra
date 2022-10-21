import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import {DialogType} from "../../../types/types";

type PropsType = {
    state: DialogType
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <img src={props.state.avatarImage}/>
            <NavLink to={'/dialogs/' + props.state.id}>{props.state.name}</NavLink>
        </div>
    );
}

export default DialogItem;