import s from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = () => {

    let postsData = [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ];
    let posts = postsData.map(e => <Post id={e.id} message={e.message} likeCount={e.likesCount}/>)

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