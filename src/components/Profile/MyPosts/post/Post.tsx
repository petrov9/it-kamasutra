import s from './Post.module.css'

type PropsType = {
    message: string
    likeCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg" alt="" id="src"/>
            {props.message}
            <div>
                <span>like</span> {props.likeCount}
            </div>
        </div>
    );
}

export default Post;