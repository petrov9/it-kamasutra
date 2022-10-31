import React, {useEffect, useState} from "react";
import {Button} from "antd";


const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
export default ChatPage

const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener("message", (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

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

    const sendMessage = () => {

        if (!message) {
            return;
        }

        wsChannel.send(message)
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
                <Button onClick={sendMessage}>send</Button>
            </div>

        </div>
    )
}