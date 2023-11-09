import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {deleteSubtask} from "../../actions/subtaskActions";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const SubtaskDelConfirmModal = ({show}) => {
    const dispatch = useDispatch();
    const subtaskCurrent = useSelector((state)=>state.subtaskReducer.subtaskCurrent);
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    /*--------------------------------------------------------------------------------*/
    const subtaskDelConfirm = () => {
        if(
            taskCurrent && taskCurrent._id &&
            subtaskCurrent && subtaskCurrent._id
        ){
            dispatch(deleteSubtask(taskCurrent._id,subtaskCurrent._id));
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"SUBTASK_CURRENT",payload:null});
        dispatch({type:'SUBTASK_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Подтвердить удаление подзадачи ?
                </div>
                <div className="modal-content">
                    {
                        subtaskCurrent &&
                        subtaskCurrent.description ?
                            <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 0 0'}}>
                                {subtaskCurrent.description}</div>
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
                                onClick={subtaskDelConfirm}
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

export default SubtaskDelConfirmModal;