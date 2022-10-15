import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    let contacts = [];
    if (profile.contacts.facebook) {
        contacts.push(<p>{profile.contacts.facebook}</p>)
    }
    if (profile.contacts.website) {
        contacts.push(<p>{profile.contacts.website}</p>)
    }
    if (profile.contacts.vk) {
        contacts.push(<p>{profile.contacts.vk}</p>)
    }

    return (
        <div>
            <div className={s.descBlock}>
                <div>
                    <img src={profile.photos.large}/>
                </div>
                <div>
                    <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
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