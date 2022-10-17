import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/user.png";

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
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

    const onMainPhotoSelected = (e) => {

        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.descBlock}>
                <div>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {
                        isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>
                    }
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