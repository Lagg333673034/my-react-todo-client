import * as api from '../api';

export const createTask = (projectId,newTask) => async(dispatch) => {
    try {
        if(projectId && projectId.length>0 && projectId !== "undefined") {
            dispatch({type:"TASKS_LOADING",payload: true});
            await api.createTask(projectId, newTask).then(
                async() => await api.fetchTasks(projectId).then(
                    ({data}) => {
                        dispatch({type:"TASK_FETCH_ALL",payload:data});
                        dispatch({type:"TASKS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateTask = (projectId,id,updatedTask) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"TASKS_LOADING",payload: true});
            await api.updateTask(id, updatedTask).then(
                async() => await api.fetchTasks(projectId).then(
                    ({data}) => {
                        dispatch({type:"TASK_FETCH_ALL",payload:data});
                        dispatch({type:"TASKS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteTask = (projectId,id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"TASKS_LOADING",payload: true});
            await api.deleteTask(id).then(
                async() => await api.fetchTasks(projectId).then(
                    ({data}) => {
                        dispatch({type:"TASK_FETCH_ALL",payload:data});
                        dispatch({type:"TASKS_LOADING",payload: false});
                    }
                )
            );
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