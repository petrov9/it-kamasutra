import {instance, ApiResponseType, ResultCode, ResultCodeForCaptcha} from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const AuthAPI = {
    authMe() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        // какой то баг, не видит promise
        // @ts-ignore
        return instance.post<ApiResponseType<LoginResponseDataType, ResultCode | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },

    logout() {
        return instance.delete<ApiResponseType>(`auth/login`).then(res => res.data);
    }
};