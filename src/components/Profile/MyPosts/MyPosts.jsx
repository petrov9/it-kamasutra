import React from 'react';
import s from './MyPosts.module.css'
import Post from "./post/Post";
import {Field, reduxForm} from "redux-form";

const AddNewFormPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newPostText"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm({
    form: "ProfileAddNewFormPost"
})(AddNewFormPost)

const MyPosts = (props) => {
    let posts = props.posts.map(e => <Post id={e.id} message={e.message} likeCount={e.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <MyPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;