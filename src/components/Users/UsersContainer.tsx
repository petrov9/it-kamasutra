import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    requestUsers, FilterType
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getUsersSuperSelector,
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getPortionSize, getUsersFilter
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean,
    totalUsersCount: number
    portionSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        let {pageSize} = this.props;
        this.props.requestUsers(1, pageSize, filter);
    }

    render = () => {

        return <>
            <h2>{this.props.pageTitle}</h2>

            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   portionSize={this.props.portionSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   onFilterChanged={this.onFilterChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>;
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {

    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        portionSize: getPortionSize(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, {follow, unfollow, requestUsers})
)(UsersContainer)