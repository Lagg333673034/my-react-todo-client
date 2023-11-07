import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {deleteProject} from "../../actions/projectActions";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const ProjectDelConfirmModal = ({show}) => {
    const dispatch = useDispatch();
    const projectCurrent = useSelector((state)=>state.projectReducer.projectCurrent);
    /*--------------------------------------------------------------------------------*/
    const projectDelConfirm = () => {
        if(projectCurrent && projectCurrent._id){
            dispatch(deleteProject(projectCurrent._id));
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"PROJECT_CURRENT",payload:null});
        dispatch({type:'PROJECT_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Подтвердить удаление проекта ?
                </div>
                <div className="modal-content">
                    {
                        projectCurrent  ?
                            <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 0 0'}}>
                                {
                                    projectCurrent.title.length>0 ?
                                        projectCurrent.title
                                        :
                                        projectCurrent.description.length>0 ?
                                            projectCurrent.description
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
                                onClick={projectDelConfirm}
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

export default ProjectDelConfirmModal;