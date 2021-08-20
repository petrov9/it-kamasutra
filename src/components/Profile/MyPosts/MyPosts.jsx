import classes from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = () => {
    return (
        <div>
            <div>
                My posts
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                </div>
            </div>
            <div>
                <Post message='Hi' likeCount='2'/>
                <Post message="It's my first message" likeCount='22'/>
            </div>
        </div>
    );
}

export default MyPosts;