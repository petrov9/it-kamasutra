import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://media.cntraveler.com/photos/57fea9ec8584f8cd20e65f15/16:9/w_2580,c_limit/Aerial-One&OnlyReethiRah-Maldives-CRHotel.jpg"
                    alt="" id="src" width='1000px' height='500px'/>
            </div>
            <div className={classes.descBlock}>
                ava + desc
            </div>
        </div>
    );
}

export default ProfileInfo;