import * as api from '../api';

export const createSubtask = (taskId,newSubtask) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            const {data} = await api.createSubtask(taskId, newSubtask);
            dispatch({type: "SUBTASK_CREATE", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateSubtask = (id,updatedSubtask) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            const {data} = await api.updateSubtask(id, updatedSubtask);
            dispatch({type: "SUBTASK_UPDATE", payload: updatedSubtask});
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteSubtask = (id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            await api.deleteSubtask(id);
            dispatch({type: "SUBTASK_DELETE", payload: id});
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