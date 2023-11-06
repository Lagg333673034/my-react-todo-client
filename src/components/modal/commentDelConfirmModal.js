import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {deleteComment} from "../../actions/commentActions";
import moment from 'moment';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const CommentDelConfirmModal = ({show}) => {
    const dispatch = useDispatch();
    const commentCurrent = useSelector((state)=>state.commentReducer.commentCurrent);
    /*--------------------------------------------------------------------------------*/
    const commentDelConfirm = () => {
        if(commentCurrent && commentCurrent._id){
            dispatch(deleteComment(commentCurrent._id));
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"COMMENT_CURRENT",payload:null});
        dispatch({type:'COMMENT_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Подтвердить удаление комментария ?
                </div>
                <div className="modal-content">
                    {
                        commentCurrent &&
                        commentCurrent.username ?
                            <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 0 0'}}>
                                {commentCurrent.username ? <span>Пользователь: {commentCurrent.username}</span> : ''}
                                {commentCurrent.dateCreate ? <span>({moment(Number(commentCurrent.dateCreate)).format("DD.MM.YYYY -- HH:mm:ss")})</span> : ''}
                            </div>
                            :
                            ''
                    }
                </div>
                <div className="modal-footer">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon/>}
                                onClick={commentDelConfirm}
                            >
                                Удалить
                            </Button>
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
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default CommentDelConfirmModal;