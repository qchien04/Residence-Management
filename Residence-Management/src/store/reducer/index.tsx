import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

const allReducer=combineReducers({
    authReducer,

    //other reducer
});

export default allReducer;