import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React, {ChangeEvent, useState} from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/user.png";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {

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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then()
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
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
                return <Contact key={key} title={key} value={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    );
}

type ContactsPropsType = {
    title: string
    value: string
}

const Contact: React.FC<ContactsPropsType> = ({title, value}) => {
    return <div className={s.contact}><b>{title}</b>: {value}</div>
}

export default ProfileInfo;