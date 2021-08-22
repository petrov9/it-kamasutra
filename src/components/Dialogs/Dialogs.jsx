import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(e => <DialogItem id={e.id} name={e.name}/>);
    let messagesElements = props.messages.map(e => <Message id={e.id} message={e.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;