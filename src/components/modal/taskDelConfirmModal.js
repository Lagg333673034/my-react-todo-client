import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {deleteTask} from "../../actions/taskActions";
import {useParams} from "react-router-dom";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const TaskDelConfirmModal = ({show}) => {
    const currentProjectId = useParams().id;
    const dispatch = useDispatch();
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    /*--------------------------------------------------------------------------------*/
    const taskDelConfirm = () => {
        if(taskCurrent && taskCurrent._id){
            dispatch(deleteTask(currentProjectId,taskCurrent._id));
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'TASK_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Подтвердить удаление задачи ?
                </div>
                <div className="modal-content">
                    {
                        taskCurrent ?
                            <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 0 0'}}>
                                {
                                    taskCurrent.title.length>0 ?
                                        taskCurrent.title
                                        :
                                        taskCurrent.description.length>0 ?
                                            taskCurrent.description
                                            :
                                            taskCurrent.number.length>0 ?
                                                taskCurrent.number
                                                :
                                                ''
                                }
                            </div> : ''
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
                                onClick={taskDelConfirm}
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

export default TaskDelConfirmModal;