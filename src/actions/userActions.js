import * as api from '../api';
//import * as api from '../api/userApi';

export const createUser = (newUser) => async(dispatch) => {
    try {
        dispatch({type:"USER_LOADING",payload: true});
        dispatch({type:"USER_FETCH_ALL",payload: {}});

        await api.createUser(newUser).then(
            async() => await api.fetchUsers().then(
                ({data}) => {
                    dispatch({type:"USER_FETCH_ALL",payload:data});
                }
            )
        );
    }catch(e){
        console.log(e);
    }finally{
        dispatch({type:"USER_LOADING",payload: false});
    }
};
export const updateUser = (id,updatedUser) => async(dispatch) => {
    try {
        if(id && id>0) {
            dispatch({type:"USER_LOADING",payload: true});
            dispatch({type:"USER_FETCH_ALL",payload: {}});

            await api.updateUser(id, updatedUser).then(
                async() => await api.fetchUsers().then(
                    ({data}) => {
                        dispatch({type:"USER_FETCH_ALL",payload:data});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"USER_LOADING",payload: false});
    }
};
export const deleteUser = (id) => async(dispatch) => {
    try {
        if(id && id>0) {
            dispatch({type:"USER_LOADING",payload: true});
            dispatch({type:"USER_FETCH_ALL",payload: {}});
            await api.deleteUser(id).then(
                async() => await api.fetchUsers().then(
                    ({data}) => {
                        dispatch({type:"USER_FETCH_ALL",payload:data});
                    }
                )
            );
        }
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"USER_LOADING",payload: false});
    }
};
export const fetchUsers = () => async(dispatch) => {
    try {
        dispatch({type:"USER_LOADING",payload: true});
        dispatch({type:"USER_FETCH_ALL",payload: {}});

        const {data} = await api.fetchUsers();
        dispatch({type:"USER_FETCH_ALL",payload:data});
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"USER_LOADING",payload: false});
    }
};