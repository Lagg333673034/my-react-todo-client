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



const TaskModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = useParams().id;
    /*--------------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
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
        setTaskCurrentState({});
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'TASK_MODAL_VISIBLE', payload: false});
        //dispatch({type:"TASK_NEED_REFRESH",payload:true});
    };
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            modalClose();
        }
    });
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
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="taskNumber"
                                label="Номер задачи"
                                variant="outlined"
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.number ? taskCurrentState.number : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, number:e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="taskTitle"
                                label="Заголовок"
                                variant="outlined"
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.title ? taskCurrentState.title : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, title:e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="taskDescription"
                                label="Описание"
                                variant="outlined"
                                autoComplete="off"
                                value={taskCurrentState && taskCurrentState.description ? taskCurrentState.description : ''}
                                onChange={(e) => setTaskCurrentState({...taskCurrentState, description:e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Приоритет</InputLabel>
                                <Select
                                    labelId="taskPriority-label"
                                    id="taskPriority"
                                    label="Приоритет"
                                    value={taskCurrentState && taskCurrentState.priority ? taskCurrentState.priority : '2'}
                                    onChange={(e) => setTaskCurrentState({...taskCurrentState, priority:e.target.value})}
                                >
                                    <MenuItem value={1}>Низкий</MenuItem>
                                    <MenuItem value={2}>Нормальный</MenuItem>
                                    <MenuItem value={3}>Высокий</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
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