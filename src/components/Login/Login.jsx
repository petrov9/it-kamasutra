import React from 'react';
import {Field, reduxForm} from "redux-form";
import {AuthAPI} from "../../api/api";
import {Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"}
                       validate={required}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"}
                       validate={required}
                       component={Input}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        AuthAPI.login(formData.login, formData.password, formData.rememberMe).then(data => {
            if (data.resultCode === 0) {
                window.location.href = "/profile";
            }
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;