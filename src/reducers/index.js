import {combineReducers} from 'redux';
import {messageReducer} from "./messageReducer";
import {websiteReducer} from "./websiteReducer";
import {userReducer} from "./userReducer";
import {authReducer} from "./authReducer";
import {projectReducer} from "./projectReducer";
import {taskReducer} from "./taskReducer";
import {subtaskReducer} from "./subtaskReducer";
import {commentReducer} from "./commentReducer";
import {fileReducer} from "./fileReducer";

export const rootReducer = combineReducers({
    messageReducer:messageReducer,
    websiteReducer:websiteReducer,
    userReducer:userReducer,
    authReducer:authReducer,
    projectReducer:projectReducer,
    taskReducer:taskReducer,
    subtaskReducer:subtaskReducer,
    commentReducer:commentReducer,
    fileReducer:fileReducer,
});
