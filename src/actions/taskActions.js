/*import * as api from '../api';

export const createTask = (projectId,newTask) => async(dispatch) => {
    try {
        if(projectId && projectId.length>0) {
            const {data} = await api.createTask(projectId, newTask);
            dispatch({type: "TASK_CREATE", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateTask = (id,updatedTask) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            const {data} = await api.updateTask(id, updatedTask);
            dispatch({type: "TASK_UPDATE", payload: data});
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
            let params = 'all';
            if (typeof projectId !== "undefined") {
                params = projectId;
            }

            const {data} = await api.fetchTasks(params);
            dispatch({type: "TASK_FETCH_ALL", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};
*/