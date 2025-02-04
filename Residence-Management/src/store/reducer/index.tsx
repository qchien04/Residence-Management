import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { chatBoxReducer } from "./chatBoxReducer";

const allReducer=combineReducers({
    authReducer,
    chatBoxReducer,
    //other reducer
});

export default allReducer;