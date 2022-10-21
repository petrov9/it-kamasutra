import s from './../Dialogs.module.css'
import React from "react";
import {MessageType} from "../../../types/types";

type Props = {
    state: MessageType
}

const Message: React.FC<Props> = (props) => {
    return (
        <div className={s.message && (props.state.isMyMessage ? s.myMessage : s.notMyMessage)}>
            {props.state.message}
        </div>
    );
}

export default Message;