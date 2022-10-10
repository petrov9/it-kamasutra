import s from './Dialogs.module.css'
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const AddMessageForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div>
            <Field component={"textarea"} name={"newMessageBody"} placeholder='Enter your message'/>
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

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(e => <DialogItem state={e}/>);
    let messagesElements = props.dialogsPage.messages.map(e => <Message state={e}/>)

    let addNewMessage = (values) => {
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