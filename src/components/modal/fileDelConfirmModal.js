import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {deleteFile} from "../../actions/fileActions";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const FileDelConfirmModal = ({show}) => {
    const dispatch = useDispatch();
    const fileCurrent = useSelector((state)=>state.fileReducer.fileCurrent);
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    /*--------------------------------------------------------------------------------*/
    const fileDelConfirm = () => {
        if(
            taskCurrent && taskCurrent._id &&
            fileCurrent && fileCurrent.fileNameUuid
        ){
            dispatch(deleteFile(taskCurrent._id,fileCurrent.fileNameUuid));
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"FILE_CURRENT",payload:null});
        dispatch({type:'FILE_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Подтвердить удаление файла ?
                </div>
                <div className="modal-content">
                    {
                        fileCurrent &&
                        fileCurrent.fileName ?
                            <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 0 0'}}>
                                {fileCurrent.fileName}</div>
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
                                onClick={fileDelConfirm}
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

export default FileDelConfirmModal;