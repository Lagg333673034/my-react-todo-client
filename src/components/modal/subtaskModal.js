import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createSubtask,updateSubtask} from "../../actions/subtaskActions";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/inputs';


const SubtaskModal = ({show}) => {
    const dispatch = useDispatch();
    const [taskCurrent,setTaskCurrent] = useState(useSelector((state)=>state.taskReducer.taskCurrent));
    const [subtaskCurrent,setSubtaskCurrent] = useState(useSelector((state)=>state.subtaskReducer.subtaskCurrent));
    /*--------------------------------------------------------------------------------*/
    const subtaskAdd = (e) => {
        if(taskCurrent && taskCurrent._id) {
            dispatch(
                createSubtask(taskCurrent._id, {
                    description: String(subtaskCurrent.description || ''),
                    done: String(''),
                }
            ));
            modalClose();
        }
    };
    const subtaskUpd = (e) => {
        if(subtaskCurrent && subtaskCurrent._id) {
            dispatch(
                updateSubtask(
                    subtaskCurrent._id, {
                        description: String(subtaskCurrent.description || ''),
                    }
                )
            );
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: false});
        dispatch({type:'SUBTASK_CURRENT', payload: null});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    {
                        subtaskCurrent &&
                        subtaskCurrent._id &&
                        subtaskCurrent._id.length>5 ?
                            'Редактировать подзадачу'
                            :
                            'Добавить подзадачу'
                    }
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField
                                label="Описание подзадачи"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={4}
                                autoComplete="off"
                                value={subtaskCurrent && subtaskCurrent.description ? subtaskCurrent.description : ''}
                                onChange={(e) => setSubtaskCurrent({...subtaskCurrent, description:e.target.value})}
                            />
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            {subtaskCurrent && subtaskCurrent._id && subtaskCurrent._id.length>5 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon/>}
                                    onClick={subtaskUpd}
                                >
                                    Сохранить изменения
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon/>}
                                    onClick={subtaskAdd}
                                >
                                    Добавить подзадачу
                                </Button>
                            }
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

export default SubtaskModal;