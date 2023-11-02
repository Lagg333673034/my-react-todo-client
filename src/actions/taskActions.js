import * as api from '../api';

export const createTask = (projectId,newTask) => async(dispatch) => {
    try {
        if(projectId && projectId.length>0) {
            dispatch({type: "TASK_CREATE", payload: newTask});
            const {data} = await api.createTask(projectId, newTask);
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateTask = (id,updatedTask) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type: "TASK_UPDATE", payload: updatedTask});
            await api.updateTask(id, updatedTask);
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteTask = (id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            await api.deleteTask(id);
            dispatch({type: "TASK_DELETE", payload: id});
        }
    } catch (e) {
        console.log(e);
    }
};

export const fetchTasks = (projectId) => async(dispatch) => {
    try {
        if(projectId && projectId.length>0) {
            const {data} = await api.fetchTasks(projectId);
            dispatch({type: "TASK_FETCH_ALL", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};