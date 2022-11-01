import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
export default ChatPage

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector(((state: AppStateType) => state.chat.messages))

    return (
        <div style={{height: "400px", overflow: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

type MessageProps = {
    message: ChatMessageType
}

const Message: React.FC<MessageProps> = ({message}) => {

    return (
        <div>
            <img style={{width: "30px"}} src={message.photo}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

    const dispatch = useDispatch()

    const sendMessageHandler = () => {

        if (!message) {
            return;
        }

        dispatch(sendMessage(message))
        setMessage("")
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => {
                    setMessage(e.currentTarget.value)
                }} value={message}></textarea>
            </div>
            <div>
                <Button disabled={false} onClick={sendMessageHandler}>send</Button>
            </div>

        </div>
    )
}