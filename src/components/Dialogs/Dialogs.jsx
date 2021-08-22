import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    );
}

const Dialogs = (props) => {

    let dialogs = [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Vasya'},
        {id: 3, name: 'Kolya'},
        {id: 4, name: 'Olya'}
    ];

    let messages = [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Not bad"},
    ];

    let dialogsElements = dialogs.map(e => <DialogItem id={e.id} name={e.name}/>);
    let messagesElements = messages.map(e => <Message id={e.id} message={e.message}/>)

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