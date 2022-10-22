import {GetItemsType, instance, ApiResponseType} from "./api";

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
    },

    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/` + userId).then(res => res.data);
    },

    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/` + userId).then(res => res.data);
    }
};