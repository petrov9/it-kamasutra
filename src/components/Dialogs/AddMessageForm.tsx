import {maxLengthCreator, required} from "../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../common/FormControls/FormsControls";
import {NewMessageFormValuesType} from "./Dialogs";

let maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = GetStringKeys<NewMessageFormValuesType>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)

