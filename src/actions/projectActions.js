import * as api from '../api';

export const createProject = (newProject) => async(dispatch) => {
    try {
        dispatch({type:"PROJECTS_LOADING",payload: true});
        await api.createProject(newProject).then(
                async() => await api.fetchProjects().then(
                        ({data}) => {
                            dispatch({type:"PROJECT_FETCH_ALL",payload:data});
                            dispatch({type:"PROJECTS_LOADING",payload: false});
                        }
                )
        );
    } catch (e) {
        console.log(e);
    }
};
export const updateProject = (id,updatedProject) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"PROJECTS_LOADING",payload: true});
            await api.updateProject(id, updatedProject).then(
                async() => await api.fetchProjects().then(
                    ({data}) => {
                        dispatch({type:"PROJECT_FETCH_ALL",payload:data});
                        dispatch({type:"PROJECTS_LOADING",payload: false});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }
};
export const deleteProject = (id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            dispatch({type:"PROJECTS_LOADING",payload: true});
            await api.deleteProject(id).then(
                async() => await api.fetchProjects().then(
                    ({data}) => {
                        dispatch({type:"PROJECT_FETCH_ALL",payload:data});
                        dispatch({type:"PROJECTS_LOADING",payload: false});
                    }
                )
            );
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