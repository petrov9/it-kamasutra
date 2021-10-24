import React from "react";
import {sendMessageClick, updateNewMessageBody} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    };
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, {
    sendMessageClick, updateNewMessageBody
})(AuthRedirectComponent);

export default DialogsContainer;