import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    let contacts = [];
    if (props.profile.contacts.facebook) {
        contacts.push(<p>{props.profile.contacts.facebook}</p>)
    }
    if (props.profile.contacts.website) {
        contacts.push(<p>{props.profile.contacts.website}</p>)
    }
    if (props.profile.contacts.vk) {
        contacts.push(<p>{props.profile.contacts.vk}</p>)
    }

    return (
        <div>
            {/*<div>
                <img
                    src="https://media.cntraveler.com/photos/57fea9ec8584f8cd20e65f15/16:9/w_2580,c_limit/Aerial-One&OnlyReethiRah-Maldives-CRHotel.jpg"
                    alt="" id="src" width='1000px' height='500px'/>
            </div>*/}
            <div className={s.descBlock}>
                <div>
                    <img src={props.profile.photos.large}/>
                </div>
                <div>
                    <ProfileStatus status={props.profile.aboutMe}/>
                </div>
                <div>
                    <p>My contacts:</p>
                    <div>
                        {contacts}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;