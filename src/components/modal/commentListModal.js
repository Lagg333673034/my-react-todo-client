import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createComment,fetchComments} from "../../actions/commentActions";
import Comment from "../comment/comment";
import CommentModal from './commentModal';
import CommentDelConfirmModal from './commentDelConfirmModal';
import Loader from '../../components/loader/loader';


import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {buttonTheme} from '../../css/button';
import AddBoxIcon from '@mui/icons-material/AddBox';

const CommentListModal = ({show}) => {
    const dispatch = useDispatch();
    const websiteVisible = useSelector((state)=>state.websiteReducer.websiteVisible);
    const websiteVisibility = () => {
        if (document.hidden) {
            dispatch({type: 'WEBSITE_VISIBLE', payload: false});
        } else {
            dispatch({type: 'WEBSITE_VISIBLE', payload: true});
        }
    };
    /*--------------------------------------------------------------------------*/
    const commentModalVisible = useSelector((state)=>state.commentReducer.commentModalVisible);
    const commentDelConfirmModalVisible = useSelector((state)=>state.commentReducer.commentDelConfirmModalVisible);
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const commentsLoading = useSelector((state)=>state.commentReducer.commentsLoading);
    const commentsFetchAll = useSelector((state)=>state.commentReducer.comments);
    /*--------------------------------------------------------------------------------*/
    const [allComments, setAllComments] = useState({});
    const [lvl0Comments, setlvl0Comments] = useState({});
    let lvlComment = 0;
    useEffect(()=>{
        if(!commentsLoading) {
            setAllComments(commentsFetchAll);
            setlvl0Comments(commentsFetchAll);
        }
    },[commentsFetchAll,commentsLoading]);
    useEffect(()=>{
        if(taskCurrent && taskCurrent._id && taskCurrent._id.length>0) {
            dispatch(fetchComments(taskCurrent._id,"null"));
        }
    },[]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                websiteVisible &&
                taskCurrent && taskCurrent._id && taskCurrent._id.length>0 &&
                !commentModalVisible &&
                !commentsLoading
            ){
                dispatch(fetchComments(taskCurrent._id,"null"));
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
    useEffect(() => {
        document.addEventListener('visibilitychange',websiteVisibility, false );
        return () => {
            document.removeEventListener('visibilitychange',websiteVisibility, false );
        };
    },[]);
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Комментарии
                    {commentsLoading ? <div><Loader/></div> : <div style={{visibility: 'hidden'}}><Loader/></div>}
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained" color="primary" size="small"
                                startIcon={<AddBoxIcon/>}
                                onClick={() => dispatch({type:'COMMENT_MODAL_VISIBLE', payload: true})}
                            >
                                Добавить комментарий
                            </Button>
                        </ThemeProvider>
                        <div style={{height:'300px',margin:'10px 0px 0px 0px',border:'1px solid gray',overflowY:'auto'}}>
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
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CloseIcon/>}
                        onClick={modalClose}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
            {commentModalVisible ? <CommentModal show={commentModalVisible}/>  : ''}
            {commentDelConfirmModalVisible ? <CommentDelConfirmModal show={commentDelConfirmModalVisible}/>  : ''}
        </div>
    )
};

export default CommentListModal;