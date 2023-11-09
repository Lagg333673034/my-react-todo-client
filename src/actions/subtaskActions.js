import * as api from '../api';

export const createSubtask = (taskId,newSubtask) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            dispatch({type:"SUBTASKS_LOADING",payload: true});
            await api.createSubtask(taskId, newSubtask).then(
                async() => await api.fetchSubtasks(taskId).then(
                    ({data}) => {
                        dispatch({type:"SUBTASK_FETCH_ALL",payload:data});
                        dispatch({type:"SUBTASKS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateSubtask = (taskId,id,updatedSubtask) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"SUBTASKS_LOADING",payload: true});
            await api.updateSubtask(id, updatedSubtask).then(
                async() => await api.fetchSubtasks(taskId).then(
                    ({data}) => {
                        dispatch({type:"SUBTASK_FETCH_ALL",payload:data});
                        dispatch({type:"SUBTASKS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteSubtask = (taskId,id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"SUBTASKS_LOADING",payload: true});
            await api.deleteSubtask(id).then(
                async() => await api.fetchSubtasks(taskId).then(
                    ({data}) => {
                        dispatch({type:"SUBTASK_FETCH_ALL",payload:data});
                        dispatch({type:"SUBTASKS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};

export const fetchSubtasks = (taskId) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            const {data} = await api.fetchSubtasks(taskId);
            dispatch({type: "SUBTASK_FETCH_ALL", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};