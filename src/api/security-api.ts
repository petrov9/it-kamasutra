import {instance} from "./api";

export type CaptchaUrlResponseType = {
    url: string
}
export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaUrlResponseType>(`security/get-captcha-url`)
    }
};