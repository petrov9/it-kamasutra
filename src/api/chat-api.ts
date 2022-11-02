const subscribers = {
    "messages-received": [] as Array<MessagesReceivedSubscriberType>,
    "status-changed": [] as Array<StatusChangedSubscriberType>
}

let ws: WebSocket | null = null

type EventNamesType = "messages-received" | "status-changed"

const openHandler = () => {
    console.log("OPEN WS")
    notifySubscribersAboutStatusType("ready")
};

const closeHandler = () => {
    console.log("CLOSE WS")
    notifySubscribersAboutStatusType("pending")
    setTimeout(createChannel, 3000)
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers["messages-received"].forEach(s => s(newMessages))
};

const errorHandler = () => {
    console.log("ERROR WS")
    notifySubscribersAboutStatusType("error")
};

const cleanUp = () => {
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("error", errorHandler)
}

const notifySubscribersAboutStatusType = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("open", openHandler)
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("error", errorHandler)
}

export const ChatAPI = {

    start() {
        createChannel()
    },

    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },

    subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
};

type MessagesReceivedSubscriberType = (messages: Array<ChatMessageApiType>) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageType = ChatMessageApiType & { id: string }

export type ChatMessageApiType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type StatusType = "pending" | "ready" | "error";