import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../common/FormControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import React from "react";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddFormPostValuesKeysType = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType & PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddFormPostValuesKeysType>("Post message", "newPostText", [required], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: "profile-add-post"})(AddPostForm)