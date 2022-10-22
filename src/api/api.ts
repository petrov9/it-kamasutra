import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "e263faeb-fa72-4c9b-8d0c-aa4bb01df379"
    }
});

export enum ResultCode {
    Success = 0,
    Error = 1
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number,
    error: string
}
export type ApiResponseType<D = {}, RC = ResultCode> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}