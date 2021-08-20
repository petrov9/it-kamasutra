import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={classes.content}>
            <div>
                <img
                    src="https://media.cntraveler.com/photos/57fea9ec8584f8cd20e65f15/16:9/w_2580,c_limit/Aerial-One&OnlyReethiRah-Maldives-CRHotel.jpg"
                    alt="" id="src"/>
            </div>
            <div>
                ava + desc
            </div>
            <MyPosts/>
        </div>
    );
}

export default Profile;