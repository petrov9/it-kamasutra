import React, {useEffect, useState} from "react";
import {Button} from "antd";

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

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log("CLOSE WS")
            setTimeout(createChannel, 3000)
        };

        function createChannel() {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        //  clean up функция
        //  аналог component will unmount
        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }

    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener("message", messageHandler)

        return () => {
            wsChannel?.removeEventListener("message", messageHandler)
            wsChannel?.close()
        }

    }, [wsChannel])

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready");
        };
        wsChannel?.addEventListener("open", openHandler)

        return () => {
            wsChannel?.removeEventListener("open", openHandler)
            wsChannel?.close()
        }

    }, [wsChannel])

    const sendMessage = () => {

        if (!message) {
            return;
        }

        wsChannel?.send(message)
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
                <Button disabled={readyStatus !== "ready"} onClick={sendMessage}>send</Button>
            </div>

        </div>
    )
}