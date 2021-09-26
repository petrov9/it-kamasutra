import React from 'react';
import s from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = (props) => {
    let posts = props.posts.map(e => <Post id={e.id} message={e.message} likeCount={e.likesCount}/>)
    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;