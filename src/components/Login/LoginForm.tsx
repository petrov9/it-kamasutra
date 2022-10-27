import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators/validators";
import styles from "../common/FormControls/FormsControls.module.css";

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                                handleSubmit,
                                                                                                                error,
                                                                                                                captchaUrl
                                                                                                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Captcha", "captcha", [required], Input)}

            {
                error && <div className={styles.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormOwnProps = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>