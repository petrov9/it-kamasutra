import React from 'react';
import s from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = (props) => {
    let posts = props.posts.map(e => <Post id={e.id} message={e.message} likeCount={e.likesCount}/>)

    let newPostElement = React.createRef();

    let addPost = () => {
        let action = {
            type: "ADD-POST"
        };
        props.dispatch(action);

        props.dispatch({
            type: "UPDATE-NEW-POST-TEXT",
            newText: ''
        });
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = {
            type: "UPDATE-NEW-POST-TEXT",
            newText: text
        };
        props.dispatch(action);
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;