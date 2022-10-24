import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../../redux/auth-reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = {
    isAuth: boolean
    login: string | null
}

type DispatchPropsType = {
    logout: () => void
}

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};

export default compose<React.ComponentType>(
    withRouter,
    connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})
)(HeaderContainer)