import React from "react";
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

const sendMessageClick = actions.sendMessageClick

type MapStateToPropsType = {
    dialogsPage: any
}

type MapDispatchToPropsType = {
    sendMessageClick: (newMessageBody: string) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    };
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {sendMessageClick}),
    withAuthRedirect
)(Dialogs);