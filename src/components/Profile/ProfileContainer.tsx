import React from "react";
import Profile from "./Profile";
import {getProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type PropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamType = {
    userId: string
}

type AllPropsType = PropsType & MapPropsType & DispatchPropsType & RouteComponentProps<PathParamType>;

class ProfileContainer extends React.Component<AllPropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;

            if (!userId){
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exist in URI params or in the state ('authorizedUserId')")
        } else {
            this.props.getProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();

    }

    componentDidUpdate(prevProps: AllPropsType, prevState: AllPropsType) {
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
                     saveProfile={this.props.saveProfile}
            />
        );
    }
}

let mapStateToProps = (state: AppStateType) => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)