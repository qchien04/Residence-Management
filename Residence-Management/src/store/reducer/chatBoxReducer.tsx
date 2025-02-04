import { ChatBoxActionType, ChatBoxState } from "../../utils/type";

// Giả sử normalizeAuthType là một kiểu hành động được định nghĩa như sau
export interface normalizeChatBoxType {
    type: ChatBoxActionType;
    payload: ChatBoxState;
}

interface ChatBoxReducerHandler {
    OPEN(state: ChatBoxState): ChatBoxState;
    CLOSE(state: ChatBoxState): ChatBoxState;
}

const reducerHandlers: ChatBoxReducerHandler = {
    OPEN(state: ChatBoxState): ChatBoxState {

        return {
            ...state,
            isOpen:true,
        };
    },

    CLOSE(state: ChatBoxState): ChatBoxState {

        return {
            ...state,
            isOpen:false,
        };
    },

};

const initialChatBox: ChatBoxState = {
    isOpen: false,
};

// Đảm bảo action có kiểu normalizeAuthType đúng
export function chatBoxReducer(state = initialChatBox, action: normalizeChatBoxType): ChatBoxState {
    if (!reducerHandlers[action.type]) return state;

    return reducerHandlers[action.type](state);
}
