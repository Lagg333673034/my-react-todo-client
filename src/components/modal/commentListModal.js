import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createComment,fetchComments} from "../../actions/commentActions";
import Comment from "../comment/comment";
import CommentModal from './commentModal';

const CommentListModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    const commentModalVisibleSelector = useSelector((state)=>state.commentReducer.commentModalVisible);
    const [commentModalVisible, setCommentModalVisible] = useState(commentModalVisibleSelector);
    useEffect(()=>{
        setCommentModalVisible(commentModalVisibleSelector);
    },[commentModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const commentFetchAll = useSelector((state)=>state.commentReducer.comments);
    const [allComments, setAllComments] = useState({});
    const [lvl0Comments, setlvl0Comments] = useState({});
    const [commentsLoading, setCommentsLoading] = useState(false);
    let lvlComment = 0;

    useEffect(()=>{
        setAllComments(commentFetchAll);
        setlvl0Comments(commentFetchAll);
    },[commentFetchAll]);

    useEffect(()=>{
        if(
            taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0 &&
            !commentModalVisible &&
            !commentsLoading
        ) {
            setCommentsLoading(true);
            dispatch(fetchComments(taskCurrentState._id,"null")).finally(() => setCommentsLoading(false));

        }
    },[commentFetchAll]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0){
                dispatch(fetchComments(taskCurrentState._id,"null"));
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'COMMENT_FETCH_ALL', payload: []});
        dispatch({type:'COMMENT_LIST_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
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
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title"></div>
                <div className="modal-content">
                    <div style={{width:'100%'}}>
                        <div className="title"></div>
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
                    </div>
                    <button
                        className="btn btnAdd"
                        type="button"
                        onClick={() => dispatch({type:'COMMENT_MODAL_VISIBLE', payload: true})}
                    >
                        Добавить коммент
                    </button>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                </div>
            </div>
            {commentModalVisible ? <CommentModal show={commentModalVisible}/>  : ''}
        </div>
    )
};

export default CommentListModal;