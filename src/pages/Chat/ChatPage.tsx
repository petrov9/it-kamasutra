import React, {useEffect, useRef, useState} from "react";
import {Button} from "antd";
import {ChatMessageApiType} from "../../api/chat-api";
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

    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === "error" && <div>Some error occurred. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector(((state: AppStateType) => state.chat.messages))
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScrollIsActive] = useState(false)

    const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        var element = event.currentTarget;
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1) {
            setIsAutoScrollIsActive(true)
        } else {
            setIsAutoScrollIsActive(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (
        <div style={{height: "400px", overflow: "auto"}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

type MessageProps = {
    message: ChatMessageApiType
}

const Message: React.FC<MessageProps> = React.memo(({message}) => {
    return (
        <div>
            <img style={{width: "30px"}} src={message.photo}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState("");
    const status = useSelector((state: AppStateType) => state.chat.status);

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
                <Button disabled={status !== "ready"} onClick={sendMessageHandler}>send</Button>
            </div>

        </div>
    )
}