import s from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = (props) => {
    let posts = props.posts.map(e => <Post id={e.id} message={e.message} likeCount={e.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;