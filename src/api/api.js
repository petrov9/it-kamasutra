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

    getProfile(userId) {
        return instance.get(`profile/` + userId).then(response => response.data);
    },

    follow(userId) {
        return instance.post(`follow/` + userId).then(response => response.data);
    },

    unfollow(userId) {
        return instance.delete(`follow/` + userId).then(response => response.data);
    }
};

export const AuthAPI = {
    authMe() {
        return instance.get(`auth/me`).then(response => response.data);
    }
};
