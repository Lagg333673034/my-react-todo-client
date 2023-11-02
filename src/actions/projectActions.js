import * as api from '../api';

export const createProject = (newProject) => async(dispatch) => {
    try {
        dispatch({type:"PROJECT_CREATE",payload:newProject});
        const {data} = await api.createProject(newProject);
    } catch (e) {
        console.log(e);
    }
};
export const updateProject = (id,updatedProject) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type: "PROJECT_UPDATE", payload: updatedProject});
            await api.updateProject(id, updatedProject);
        }
    } catch (e) {
        console.log(e);
    }
};
export const deleteProject = (id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            await api.deleteProject(id);
            dispatch({type: "PROJECT_DELETE", payload: id});
        }
    } catch (e) {
        console.log(e);
    }
};
export const fetchProjects = () => async(dispatch) => {
    try {
        const {data} = await api.fetchProjects();
        dispatch({type:"PROJECT_FETCH_ALL",payload:data});
    } catch (e) {
        console.log(e);
    }
};