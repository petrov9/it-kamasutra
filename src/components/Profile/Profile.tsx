import React, {useEffect} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {useHistory, useParams} from "react-router-dom";

type PropsType = {}

const Profile: React.FC<PropsType> = () => {

    const params: any = useParams();
    const history = useHistory();

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const isOwner = !params.userId

    const dispatch = useDispatch();

    useEffect(() => {
        let userId: number | null = +params.userId;
        if (!userId) {
            userId = authorizedUserId;

            if (!userId) {
                history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exist in URI params or in the state ('authorizedUserId')")
        } else {
            getProfileW(userId);
            getUserStatusW(userId);
        }
    }, [status, isOwner])

    const updateUserStatusW = (status: string) => {
        dispatch(updateUserStatus(status))
    }

    const savePhotoW = (file: File) => {
        dispatch(savePhoto(file))
    }

    const saveProfileW = async (profile: ProfileType) => {
        await dispatch(saveProfile(profile))
    }

    const getProfileW = (userId: number) => {
        dispatch(getProfile(userId))
    }

    const getUserStatusW = (userId: number) => {
        dispatch(getUserStatus(userId))
    }

    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateUserStatus={updateUserStatusW}
                isOwner={isOwner}
                savePhoto={savePhotoW}
                saveProfile={saveProfileW}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;