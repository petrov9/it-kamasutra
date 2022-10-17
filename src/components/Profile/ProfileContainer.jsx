import React from "react";
import Profile from "./Profile";
import {getProfile, getUserStatus, savePhoto, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;

            if (!userId){
                this.props.history.push("/login");
            }
        }

        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }

        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render = () => {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     savePhoto={this.props.savePhoto}
            />
        );
    }
}

let mapStateToProps = (state) => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, savePhoto}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)