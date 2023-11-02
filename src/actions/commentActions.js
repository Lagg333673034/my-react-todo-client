import * as api from '../api';

export const createComment = (taskId,commentId,newComment) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            const {data} = await api.createComment(taskId,commentId,newComment);
            dispatch({type: "COMMENT_CREATE", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteComment = (id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            await api.deleteComment(id);
            dispatch({type: "COMMENT_DELETE", payload: id});
        }
    } catch (e) {
        console.log(e);
    }
};

export const fetchComments = (taskId,commentId) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            const {data} = await api.fetchComments(taskId,commentId);
            dispatch({type: "COMMENT_FETCH_ALL", payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};