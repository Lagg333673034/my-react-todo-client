import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import SubtaskModal from './subtaskModal';
import {fetchTask,createTask,updateTask,fetchSubtasks,createSubtask} from "../../api";
import {useParams} from "react-router-dom";
import moment from 'moment';
import Subtask from "../subtask/subtask";
import {createComment, fetchComments, fetchTasks} from "../../api/index";
import Comment from "../comment/comment";

const CommentModal = ({show}) => {
    const dispatch = useDispatch();
    const [taskData,setTaskData] = useState({});
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = useParams().id;
    const currentTaskId = localStorage.getItem('taskCurrentId');
    useEffect(()=>{
        if(
            currentProjectId && currentProjectId.length>5 &&
            currentTaskId && currentTaskId.length>5
        ) {
            fetchTask(currentProjectId,currentTaskId).then(response => setTaskData(response.data[0]));
        }
    },[currentProjectId,currentTaskId]);
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setTaskData({});
        localStorage.removeItem('taskCurrentId');
        dispatch({type:'COMMENT_MODAL_VISIBLE', payload: false});
    };
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            modalClose();
        }
    });
    /*--------------------------------------------------------------------------------*/
    const [tempComments, setTempComments] = useState({});
    const [allComments, setAllComments] = useState({});
    const [lvl0Comments, setlvl0Comments] = useState({});
    let lvlComment = 0;

    useEffect(()=>{
        if(currentTaskId) {
            fetchComments(currentTaskId,"null")
                .then(response => setTempComments(response.data));
            setAllComments(tempComments);
            setlvl0Comments(tempComments);
        }
    },[tempComments]);
    useEffect(()=>{
        let timerId = setInterval(() => {
            if(currentTaskId) {
                fetchComments(currentTaskId,"null")
                    .then(response => setTempComments(response.data));
                setAllComments(tempComments);
                setlvl0Comments(tempComments);
            }
        }, 2000);
        return ()=>{
            clearInterval(timerId);
        }
    },[tempComments]);

    const showSubComments = (comments,comment,lvl) => {
        let temp_comments = comments;
        let temp_lvl = Number(lvl)+1;
        return(
            temp_comments
                .filter(c => c.commentId === comment._id)
                .map((c, c_index) =>
                    <div key={c_index}>
                        <Comment comment={c} lvl={temp_lvl}/>
                        {showSubComments(allComments,c,temp_lvl)}
                    </div>
                )
        )
    };
    /*--------------------------------------------------------------------------------*/
    const [commentData, setCommentData] = useState({username:'',message:''});
    const messageSend = (e) => {
        e.preventDefault();
        let commentId = '';
        if(localStorage.getItem('selectedCommenId')){
            commentId = localStorage.getItem('selectedCommenId');
        }

        createComment(
            currentTaskId,
            commentId,
            {
                dateCreate: String(moment(new Date(), "YYYY-MM-DD").valueOf()),
                username: String(commentData.username || ''),
                message: String(commentData.message || ''),
            }
        );
        setCommentData({username:'',message:''});
        localStorage.removeItem('selectedCommenId');
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title"></div>
                <div className="modal-content">
                    <div style={{width:'100%'}}>
                        <div className="title">
                            Комментарии к задаче<br/>
                            {taskData.title}
                        </div>
                        <div style={{height:'300px',border:'1px solid gray', overflowY:'auto'}}>
                            {
                                lvl0Comments &&
                                lvl0Comments.length > 0 &&
                                lvl0Comments
                                    .filter(comment => comment.commentId === "")
                                    .map((comment, comment_index) =>
                                        <div key={comment_index}>
                                            <Comment comment={comment} lvl={lvlComment}/>
                                            {showSubComments(allComments,comment,lvlComment)}
                                        </div>
                                )

                            }
                        </div>
                        <div>
                            <div className="inputOut">
                                Имя пользователя
                                <input
                                    className="inputIn"
                                    type="text"
                                    id="username"
                                    autoComplete="off"
                                    value={commentData.username ? commentData.username : ''}
                                    onChange={(e) => setCommentData({...commentData, username:e.target.value})}
                                />
                            </div>
                            <div className="inputOut">
                                Сообщение
                                <input
                                    className="inputIn"
                                    type="text"
                                    id="message"
                                    autoComplete="off"
                                    value={commentData.message ? commentData.message : ''}
                                    onChange={(e) => setCommentData({...commentData, message:e.target.value})}
                                />
                            </div>
                            <button
                                className="btn btnAdd"
                                type="button"
                                onClick={messageSend}
                            >
                                Отправить комментарий
                            </button>
                            <div>
                                {localStorage.getItem('selectedCommenId') ?
                                    <div>
                                        к комм.: {localStorage.getItem('selectedCommenId')}
                                        <button
                                            className="btn btnDel iconDel"
                                            type="button"
                                            onClick={()=>localStorage.removeItem('selectedCommenId')}
                                        >
                                            &#10007;
                                        </button>
                                    </div>
                                    :
                                    ''}
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