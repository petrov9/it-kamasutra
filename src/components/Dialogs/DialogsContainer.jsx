import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let sendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let newMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    return (
        <Dialogs
            sendMessageClick={sendMessageClick}
            updateNewMessageBody={newMessageChange}
            dialogsPage={state}
        />
    );
}

export default DialogsContainer;