import {FormAction} from "redux-form";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {ChatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as Array<ChatMessageType>
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state;
    }

    return state;
}

const actions = {
    messagesReceived: (messages: Array<ChatMessageType>) =>
        ({type: "SN/chat/MESSAGES_RECEIVED", payload: {messages}}) as const
}

let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {

    if (_newMessageHandler == null) {
        _newMessageHandler = (messages) => dispatch(actions.messagesReceived(messages))
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.start()
    ChatAPI.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    ChatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    ChatAPI.sendMessage(message);
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>;