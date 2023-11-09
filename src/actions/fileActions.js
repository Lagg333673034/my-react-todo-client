import * as api from '../api';

export const createFile = (taskId,newFile) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            //const {data} = await api.createFile(newFile);
            //dispatch({type: "FILE_CREATE", payload: data});

            dispatch({type: "FILES_LOADING", payload: true});
            await api.createFile(newFile).then(
                async () => await api.fetchFiles(taskId).then(
                    ({data}) => {
                        dispatch({type: "FILE_FETCH_ALL", payload: data});
                        dispatch({type: "FILES_LOADING", payload: false});
                    }
                )
            );

        }
    } catch (e) {
        console.log(e);
    }
};
export const deleteFile = (taskId,fileNameUuid) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            //await api.deleteFile(taskId,fileNameUuid);
            //dispatch({type: "FILE_DELETE", payload: {taskId,fileNameUuid}});

            dispatch({type:"FILES_LOADING",payload: true});
            await api.deleteFile(taskId,fileNameUuid).then(
                async() => await api.fetchFiles(taskId).then(
                    ({data}) => {
                        dispatch({type:"FILE_FETCH_ALL",payload:data});
                        dispatch({type:"FILES_LOADING",payload: false});
                    }
                )
            );


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