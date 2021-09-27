import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().dialogsPage;

                    let sendMessageClick = () => {
                        store.dispatch(sendMessageCreator());
                    }

                    let newMessageChange = (e) => {
                        let body = e.target.value;
                        store.dispatch(updateNewMessageBodyCreator(body));
                    }

                    return (
                        <Dialogs
                            sendMessageClick={sendMessageClick}
                            updateNewMessageBody={newMessageChange}
                            dialogsPage={state}
                        />
                    );
                }
            }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;