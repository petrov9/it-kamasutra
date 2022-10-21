import s from './Dialogs.module.css'
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormControls/FormsControls";
import {DialogType, MessageType} from "../../types/types";

let maxLength50 = maxLengthCreator(50);

type FormProps = {
}

const AddMessageForm: React.FC<InjectedFormProps<FormProps>> = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div>
            <Field component={Textarea} name={"newMessageBody"}
                   validate={[required, maxLength50]}
                   placeholder='Enter your message'/>
          </div>
          <div>
              <button>Отправить</button>
          </div>
      </form>
  )
}

const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"
}) (AddMessageForm)

type PropsType = {
    dialogsPage: any
    isAuth: boolean
    sendMessageClick: (newMessageBody: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map((e: DialogType) => <DialogItem state={e}/>);
    let messagesElements = props.dialogsPage.messages.map((e: MessageType) => <Message state={e}/>)

    let addNewMessage = (values: any) => {
        props.sendMessageClick(values.newMessageBody);
    }

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
}

export default Dialogs;