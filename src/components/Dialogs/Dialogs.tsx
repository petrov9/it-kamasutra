import s from './Dialogs.module.css'
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../types/types";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {AddMessageFormRedux} from "./AddMessageForm";

export type NewMessageFormValuesType = {
    newMessageBody: string
}

type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map((e: DialogType) => <DialogItem state={e} key={e.id}/>);
    let messagesElements = props.dialogsPage.messages.map((e: MessageType) => <Message state={e} key={e.id}/>)

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
}

export default Dialogs;