import axios from "axios";
import {ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "e263faeb-fa72-4c9b-8d0c-aa4bb01df379"
    }
});

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number,
    error: string
}

type UnfollowResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: any
}

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(userId: number) {
        return instance.post<boolean>(`follow/` + userId).then(response => response.data);
    },

    unfollow(userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/` + userId).then(response => response.data);
    }
};

type UpdateStatusRequestType = {
    status: string
}
type UpdateStatusResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: any
}

type SavePhotoRequestType = {
    image: any
}
type SavePhotoResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: any
}

type SaveProfileResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: any
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId);
    },

    updateStatus(status: string) {
        return instance.put<UpdateStatusRequestType, UpdateStatusResponseType>(`profile/status/`, {status: status});
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        // @ts-ignore
        return instance.put<SavePhotoRequestType, SavePhotoResponseType>(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ProfileType, SaveProfileResponseType>(`profile`, profile);
    },
}

export enum ResultCode {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type MeResponseType = {
    resultCode: ResultCode
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
type LoginResponseType = {
    resultCode: ResultCode | ResultCodeForCaptcha
    messages: Array<string>,
    data: {
        userId: number
    }
}
type LoginRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
}
type LogoutResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: any
}

type CaptchaUrlResponseType = {
    url: string
}

export const AuthAPI = {
    authMe() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        // какой то баг, не видит promise
        // @ts-ignore
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(response => response.data);
    }
};

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaUrlResponseType>(`security/get-captcha-url`);
    }
};
