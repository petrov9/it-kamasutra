import React from "react";
import {sendMessageClick, updateNewMessageBody} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    };
}

const DialogsContainer = connect(mapStateToProps, {
    sendMessageClick, updateNewMessageBody
})(Dialogs);

export default DialogsContainer;