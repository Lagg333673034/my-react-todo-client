import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchTask,createTask,updateTask,fetchSubtasks} from "../../actions/taskActions";
import {useParams} from "react-router-dom";
import moment from 'moment';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/inputs';


const TaskModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = useParams().id;
    const [taskCurrentState, setTaskCurrentState] = useState(useSelector((state)=>state.taskReducer.taskCurrent));
    /*--------------------------------------------------------------------------------*/
    const taskAdd = (e) => {
        dispatch(
            createTask(
                currentProjectId,
                {
                    number: String(taskCurrentState.number || ''),
                    title: String(taskCurrentState.title || ''),
                    description: String(taskCurrentState.description || ''),
                    dateCreate: String(moment(new Date(), "YYYY-MM-DD").valueOf()),
                    priority: String(taskCurrentState.priority || '2'),
                    status: String('1')
                }
            )
        );
        modalClose();
        //let t1 = moment(new Date(), "YYYY-MM-DD").valueOf();
        //console.log(moment(t1).format("YYYY-MM-DD"));
    };
    const taskUpd = (e) => {
        dispatch(
            updateTask(
                taskCurrentState._id,
                {
                    number: String(taskCurrentState.number || ''),
                    title: String(taskCurrentState.title || ''),
                    description: String(taskCurrentState.description || ''),
                    priority: String(taskCurrentState.priority || '2'),
                }
            )
        );
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'TASK_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    {
                        taskCurrentState &&
                        taskCurrentState._id &&
                        taskCurrentState._id.length>5 ?
                            'Редактировать задачу'
                            :
                            'Добавить задачу'
                    }
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField
                                label="Номер задачи"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.number ? taskCurrentState.number : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, number:e.target.value})}
                            />
                            <TextField
                                label="Заголовок"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.title ? taskCurrentState.title : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, title:e.target.value})}
                            />
                            <TextField
                                label="Описание задачи"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={4}
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.description ? taskCurrentState.description : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, description:e.target.value})}
                            />
                            <FormControl sx={{ }}>
                                <InputLabel>Приоритет</InputLabel>
                                <Select
                                    label="Приоритет"
                                    size="small"
                                    value={taskCurrentState && taskCurrentState.priority ? taskCurrentState.priority : '2'}
                                    onChange={(e) => setTaskCurrentState({...taskCurrentState, priority:e.target.value})}
                                >
                                    <MenuItem value={1}>Низкий</MenuItem>
                                    <MenuItem value={2}>Нормальный</MenuItem>
                                    <MenuItem value={3}>Высокий</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs="auto">
                            {taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>5 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon/>}
                                    onClick={taskUpd}
                                >
                                    Сохранить изменения
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon/>}
                                    onClick={taskAdd}
                                >
                                    Добавить задачу
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

export default TaskModal;