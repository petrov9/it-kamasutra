import React from 'react';
import s from './MyPosts.module.css'
import Post from "./post/Post";
import AddPostForm, {AddPostFormValuesType} from "./AddNewFormPost";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let posts = [...props.posts].reverse().map(e => <Post key={e.id} message={e.message} likeCount={e.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <AddPostForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
}

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized;