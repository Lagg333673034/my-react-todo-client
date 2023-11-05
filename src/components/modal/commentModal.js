import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
import {createComment,fetchComments} from "../../actions/commentActions";

const CommentModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const commentCurrent = useSelector((state)=>state.commentReducer.commentCurrent);
    const [commentCurrentState, setCommentCurrentState] = useState(commentCurrent);
    useEffect(()=>{
        setCommentCurrentState(commentCurrent);
    },[commentCurrent]);
    /*--------------------------------------------------------------------------------*/
    const commentToComment = useSelector((state)=>state.commentReducer.commentToComment);
    const [commentToCommentState, setCommentToCommentState] = useState(commentToComment);
    useEffect(()=>{
        setCommentToCommentState(commentToComment);
    },[commentToComment]);
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:'COMMENT_MODAL_VISIBLE', payload: false});
        dispatch({type:'COMMENT_CURRENT', payload: null});
        dispatch({type:'COMMENT_TO_COMMENT', payload: null});
    };
    /*--------------------------------------------------------------------------------*/
    const commentAdd = (e) => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0) {
            let commentToCommentId = '';
            if (commentToCommentState && commentToCommentState._id && commentToCommentState._id.length > 0) {
                commentToCommentId = commentToCommentState;
            }

            dispatch(
                createComment(
                    taskCurrentState._id,
                    commentToCommentId,
                    {
                        dateCreate: String(moment(new Date(), "YYYY-MM-DD").valueOf()),
                        username: String(commentCurrentState.username || ''),
                        message: String(commentCurrentState.message || ''),
                    }
                )
            );
            setCommentCurrentState({username: '', message: ''});
            dispatch({type:'COMMENT_TO_COMMENT', payload: null});
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title"></div>
                <div className="modal-content">
                    <div style={{width:'100%'}}>
                        <div>
                            <div className="inputOut">
                                Имя пользователя
                                <input
                                    className="inputIn"
                                    type="text"
                                    id="username"
                                    autoComplete="off"
                                    value={commentCurrentState && commentCurrentState.username ? commentCurrentState.username : ''}
                                    onChange={(e) => setCommentCurrentState({...commentCurrentState, username:e.target.value})}
                                />
                            </div>
                            <div className="inputOut">
                                Сообщение
                                <input
                                    className="inputIn"
                                    type="text"
                                    id="message"
                                    autoComplete="off"
                                    value={commentCurrentState && commentCurrentState.message ? commentCurrentState.message : ''}
                                    onChange={(e) => setCommentCurrentState({...commentCurrentState, message:e.target.value})}
                                />
                            </div>
                            <button
                                className="btn btnAdd"
                                type="button"
                                onClick={commentAdd}
                            >
                                Отправить комментарий
                            </button>
                            <div>
                                {
                                    commentToCommentState &&
                                    commentToCommentState._id &&
                                    commentToCommentState._id.length>0 ?
                                        <div>
                                            к комм.:
                                            {commentToCommentState && commentToCommentState.username}
                                            ({moment(Number(commentToCommentState.dateCreate)).format("DD.MM.YYYY  HH:mm:ss")})
                                            <button
                                                className="btn btnDel iconDel"
                                                type="button"
                                                onClick={()=>dispatch({type:'COMMENT_TO_COMMENT', payload: null})}
                                            >
                                                &#10007;
                                            </button>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                </div>
            </div>
        </div>
    )
};

export default CommentModal;