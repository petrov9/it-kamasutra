import s from './../Dialogs.module.css'
import React from "react";

const Message = (props) => {
    return (
        <div className={s.message && (props.state.isMyMessage ? s.myMessage : s.notMyMessage)}>
            {props.state.message}
        </div>
    );
}

export default Message;