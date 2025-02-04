import { ChatBoxActionType, ChatBoxState } from "../../utils/type";



export function OpenChatBox(payload: ChatBoxState) {
    return {
        type: ChatBoxActionType.OPEN,
        payload:payload,
    };
}
export function CloseChatBox(payload: ChatBoxState) {
    return {
        type: ChatBoxActionType.CLOSE,
        payload:payload,
    };
}
  