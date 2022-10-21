import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "e263faeb-fa72-4c9b-8d0c-aa4bb01df379"
    }
});

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(userId) {
        return instance.post(`follow/` + userId).then(response => response.data);
    },

    unfollow(userId) {
        return instance.delete(`follow/` + userId).then(response => response.data);
    }
};

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId).then(response => response.data);
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status});
    },

    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    saveProfile(profile) {
        return instance.put(`profile`, profile);
    },
}

export const AuthAPI = {
    authMe() {
        return instance.get(`auth/me`).then(response => response.data);
    },

    //TODO: captcha = null
    login(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data);
    },

    logout() {
        return instance.delete(`auth/login`).then(response => response.data);
    }
};

export const SEcurityAPI = {
    getCaptchUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};
