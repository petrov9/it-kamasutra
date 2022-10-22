import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const addPost = actions.addPost;

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    };
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost
})(MyPosts);

export default MyPostsContainer;