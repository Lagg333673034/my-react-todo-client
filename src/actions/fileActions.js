import * as api from '../api';

export const createFile = (newFile) => async(dispatch) => {
    try {
        const {data} = await api.createFile(newFile);
        dispatch({type: "FILE_CREATE", payload: data});
    } catch (e) {
        console.log(e);
    }
};
export const deleteFile = (taskId,fileNameUuid) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            await api.deleteFile(taskId,fileNameUuid);
            dispatch({type: "FILE_DELETE", payload: {taskId,fileNameUuid}});
        }
    } catch (e) {
        console.log(e);
    }
};
export const fetchFiles = (taskId) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            const {data} = await api.fetchFiles(taskId);
            dispatch({type: "FILE_FETCH_ALL", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};