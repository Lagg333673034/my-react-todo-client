import * as api from '../api';
//import * as api from '../api/authApi';

export const login = (email,password) => async(dispatch) => {
    try {
        dispatch({type:"AUTH_LOADING",payload: true});
        await api.login(email,password).then(
            (response) => {
                localStorage.setItem('token', response.data.accessToken);
                dispatch({type:"IS_AUTH",payload: true});
                dispatch({type:"AUTH_USER",payload: response.data.user});
            }
        );
    } catch (e) {
        console.log(e);
        //console.log(e.response.data.message);
        dispatch({type:"MESSAGE_MSG",payload: e.response.data.message});
        dispatch({type:"MESSAGE_TYPE",payload: "error"});
    }finally{
        dispatch({type:"AUTH_LOADING",payload: false});
    }
};
export const registration = (email,password) => async(dispatch) => {
    try {
        dispatch({type:"AUTH_LOADING",payload: true});
        await api.registration(email,password).then(
            (response) => {
                localStorage.setItem('token', response.data.accessToken);
                dispatch({type:"IS_AUTH",payload: true});
                dispatch({type:"AUTH_USER",payload: response.data.user});
            }
        );
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"AUTH_LOADING",payload: false});
    }
};
export const logout = () => async(dispatch) => {
    try {
        dispatch({type:"AUTH_LOADING",payload: true});
        await api.logout().then(
            () => {
                localStorage.removeItem('token');
                dispatch({type:"IS_AUTH",payload: false});
                dispatch({type:"AUTH_USER",payload: {}});
            }
        );
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"AUTH_LOADING",payload: false});
    }
};
export const refresh = () => async(dispatch) => {
    try {
        dispatch({type:"TOKEN_LOADING",payload: true});
        await api.refresh().then(
            (response) => {
                if(response.data) {
                    localStorage.setItem('token', response.data.accessToken);
                    dispatch({type: "IS_AUTH", payload: true});
                    dispatch({type: "AUTH_USER", payload: response.data.user});

                }
            }
        );
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"TOKEN_LOADING",payload: false});
    }
};
export const recoverPasswordEmail = (email) => async(dispatch) => {
    try {
        dispatch({type:"AUTH_LOADING",payload: true});
        await api.recoverPasswordEmail(email);
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"AUTH_LOADING",payload: false});
    }
};
export const recoverPassword = (randomUuid,password) => async(dispatch) => {
    try {
        dispatch({type:"AUTH_LOADING",payload: true});
        await api.recoverPassword(randomUuid,password).then(
            (response) => {
                localStorage.setItem('token', response.data.accessToken);
                dispatch({type:"IS_AUTH",payload: true});
                dispatch({type:"AUTH_USER",payload: response.data.user});
            }
        );
    } catch (e) {
        console.log(e);
    }finally{
        dispatch({type:"AUTH_LOADING",payload: false});
    }
};


