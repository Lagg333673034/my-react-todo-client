import React,{useState} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
import {createComment} from "../../actions/commentActions";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/inputs';
import IconButton from '@mui/material/IconButton';
import {buttonIconSmallHoverTheme} from '../../css/buttons';

const CommentModal = ({show}) => {
    const dispatch = useDispatch();
    const [taskCurrent,setTaskCurrent] = useState(useSelector((state)=>state.taskReducer.taskCurrent));
    const [commentCurrent,setCommentCurrent] = useState(useSelector((state)=>state.commentReducer.commentCurrent));
    const [commentToComment,setCommentToComment] = useState(useSelector((state)=>state.commentReducer.commentToComment));
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:'COMMENT_MODAL_VISIBLE', payload: false});
        dispatch({type:'COMMENT_CURRENT', payload: null});
        dispatch({type:'COMMENT_TO_COMMENT', payload: null});
    };
    /*--------------------------------------------------------------------------------*/
    const commentAdd = (e) => {
        if(taskCurrent && taskCurrent._id && taskCurrent._id.length>0) {
            let commentToCommentId = '';
            if (commentToComment && commentToComment._id && commentToComment._id.length > 0) {
                commentToCommentId = commentToComment;
            }

            dispatch(
                createComment(
                    taskCurrent._id,
                    commentToCommentId,
                    {
                        dateCreate: String(moment(new Date(), "YYYY-MM-DD").valueOf()),
                        username: String(commentCurrent.username || ''),
                        message: String(commentCurrent.message || ''),
                    }
                )
            );
            setCommentCurrent({username: '', message: ''});
            dispatch({type:'COMMENT_TO_COMMENT', payload: null});
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Добавить комментарий
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField
                                label="Имя пользователя"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={commentCurrent && commentCurrent.username ? commentCurrent.username : ''}
                                onChange={(e) => setCommentCurrent({...commentCurrent, username:e.target.value})}
                            />
                            <TextField
                                label="Сообщение"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={commentCurrent && commentCurrent.message ? commentCurrent.message : ''}
                                onChange={(e) => setCommentCurrent({...commentCurrent, message:e.target.value})}
                            />
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon/>}
                                onClick={commentAdd}
                            >
                                Добавить комментарий
                            </Button>
                            <div>
                                {
                                    commentToComment &&
                                    commentToComment._id &&
                                    commentToComment._id.length>0 ?
                                        <div>
                                            к комментарию:
                                            {commentToComment && commentToComment.username}
                                            ({moment(Number(commentToComment.dateCreate)).format("DD.MM.YYYY -- HH:mm:ss")})
                                            <IconButton
                                                color="error"
                                                size="small"
                                                sx={buttonIconSmallHoverTheme}
                                                onClick={() => setCommentToComment(null)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<CloseIcon/>}
                                onClick={modalClose}
                            >
                                Закрыть
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default CommentModal;