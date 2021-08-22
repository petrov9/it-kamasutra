import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src="https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg" alt="" id="src"/>
            {props.message}
            <div>
                <span>like</span> {props.likeCount}
            </div>
        </div>
    );
}

export default Post;