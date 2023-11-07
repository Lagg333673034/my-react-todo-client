import {combineReducers} from 'redux';
import {websiteReducer} from "./websiteReducer";
import {projectReducer} from "./projectReducer";
import {taskReducer} from "./taskReducer";
import {subtaskReducer} from "./subtaskReducer";
import {commentReducer} from "./commentReducer";
import {fileReducer} from "./fileReducer";

export const rootReducer = combineReducers({
    websiteReducer:websiteReducer,
    projectReducer:projectReducer,
    taskReducer:taskReducer,
    subtaskReducer:subtaskReducer,
    commentReducer:commentReducer,
    fileReducer:fileReducer,
});
