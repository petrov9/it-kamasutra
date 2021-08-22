import classes from './MyPosts.module.css'
import Post from "./post/Post";

const MyPosts = () => {

    let postsData = [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ];

    return (
        <div className={classes.postsBlock}>
            <div>
                <h3>My posts</h3>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                <Post id={postsData[0].id} message={postsData[0].message} likeCount={postsData[0].likesCount}/>
                <Post id={postsData[1].id} message={postsData[1].message} likeCount={postsData[1].likesCount}/>
            </div>
        </div>
    );
}

export default MyPosts;