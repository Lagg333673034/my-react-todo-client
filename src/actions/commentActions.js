import * as api from '../api';

export const createComment = (taskId,commentId,newComment) => async(dispatch) => {
    try {
        if(taskId && taskId.length>0) {
            //const {data} = await api.createComment(taskId,commentId,newComment);
            //dispatch({type: "COMMENT_CREATE", payload: data});

            dispatch({type:"COMMENTS_LOADING",payload: true});
            await api.createComment(taskId,commentId,newComment).then(
                async() => await api.fetchComments(taskId,"null").then(
                    ({data}) => {
                        dispatch({type:"COMMENT_FETCH_ALL",payload:data});
                        dispatch({type:"COMMENTS_LOADING",payload: false});
                    }
                )
            );



        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteComment = (taskId,commentId,id) => async(dispatch) => {
    try {
        if(id && id.length>0) {
            //await api.deleteComment(id);
            //dispatch({type: "COMMENT_DELETE", payload: id});

            dispatch({type:"COMMENTS_LOADING",payload: true});
            await api.deleteComment(id).then(
                async() => await api.fetchComments(taskId,"null").then(
                    ({data}) => {
                        dispatch({type:"COMMENT_FETCH_ALL",payload:data});
                        dispatch({type:"COMMENTS_LOADING",payload: false});
                    }
                )
            );

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