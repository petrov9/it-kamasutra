import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(e => <DialogItem state={e}/>);
    let messagesElements = props.state.messages.map(e => <Message state={e}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea placeholder='Сообщение'></textarea>
                <button>Отправить</button>
            </div>

        </div>
    );
}

export default Dialogs;