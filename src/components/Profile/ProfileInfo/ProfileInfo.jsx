import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React, {useState} from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/user.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

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

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    return (
        <div>
            <div className={s.descBlock}>
                <div>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                    {editMode
                        ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}

                </div>
                <div>
                    <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                </div>
            </div>
        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>

            {isOwner && <div>
                <button onClick={goToEditMode}> edit</button>
            </div>}

            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} title={key} value={profile.contacts[key]}/>
            })}
            </div>
        </div>
    );
}

const Contact = ({title, value}) => {
    return <div className={s.contact}><b>{title}</b>: {value}</div>
}

export default ProfileInfo;