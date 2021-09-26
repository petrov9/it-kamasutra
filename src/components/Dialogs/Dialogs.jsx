import s from './Dialogs.module.css'
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(e => <DialogItem state={e}/>);
    let messagesElements = props.dialogsPage.messages.map(e => <Message state={e}/>)
    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessageClick();
    }

    let onNewMessageChange = (e) => {
        props.updateNewMessageBody(e);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea value={newMessageBody}
                                  onChange={onNewMessageChange}
                                  placeholder='Enter your message'
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Отправить</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dialogs;