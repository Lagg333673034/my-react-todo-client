import {combineReducers} from 'redux';
import {projectReducer} from "./projectReducer";
import {taskReducer} from "./taskReducer";
import {subtaskReducer} from "./subtaskReducer";
import {commentReducer} from "./commentReducer";
import {fileReducer} from "./fileReducer";

export const rootReducer = combineReducers({
    projectReducer:projectReducer,
    taskReducer:taskReducer,
    subtaskReducer:subtaskReducer,
    commentReducer:commentReducer,
    fileReducer:fileReducer,
});
