import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../../redux/auth-reducer";
import {withRouter} from "react-router-dom";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, {logout})
)(HeaderContainer)