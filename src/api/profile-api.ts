import {PhotosType, ProfileType} from "../types/types";
import {instance, ApiResponseType} from "./api";

type UpdateStatusRequestType = {
    status: string
}
type SavePhotoRequestType = {
    image: any
}

type SavePhotosResponseDataType = {
    photos: PhotosType
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },

    updateStatus(status: string) {
        return instance.put<UpdateStatusRequestType, ApiResponseType>(`profile/status/`, {status: status}).then(res => res.data);
    },

    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        // @ts-ignore
        return instance.put<SavePhotoRequestType, ApiResponseType<SavePhotosResponseDataType>>(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ProfileType, ApiResponseType>(`profile`, profile).then(res => res.data);
    },
}