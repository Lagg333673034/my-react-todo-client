import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask} from "../../actions/taskActions";
import './task.css';
import moment from 'moment';
import {Draggable} from 'react-beautiful-dnd';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const Task = ({index,task}) => {
    /*--------------------------------------------------------------------------*/
    const dispatch = useDispatch();
    const subtaskListModal = (task) => {
        dispatch({type:"TASK_CURRENT",payload:task});
        dispatch({type:'SUBTASK_LIST_MODAL_VISIBLE', payload: true});
    };
    const commentListModal = (task) => {
        dispatch({type:"TASK_CURRENT",payload:task});
        dispatch({type:'COMMENT_LIST_MODAL_VISIBLE', payload: true});
    };
    const fileListModal = (task) => {
        dispatch({type:"TASK_CURRENT",payload:task});
        dispatch({type:'FILE_LIST_MODAL_VISIBLE', payload: true});
    };
    const updTask = (task) => {
        dispatch({type:"TASK_CURRENT",payload:task});
        dispatch({type:'TASK_MODAL_VISIBLE', payload: true});
    };
    const delTask = (task) => {
        dispatch(deleteTask(task._id));
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Draggable draggableId={String(task._id)} index={index}>
            {(provided,snapshot) => (
                <div
                    className={snapshot.isDragging ? "taskIsDragging" : ""}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >

                    <Card sx={{ minWidth: 275 }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs>
                                {task.number ? <Typography variant="body2">{task.number}</Typography> : ''}
                                {task.title ? <Typography variant="body2">{task.title}</Typography> : ''}
                                {task.description ? <Typography variant="body2">{task.description}</Typography> : ''}
                                {task.timeInWork ? <Typography variant="body2">в работе ({
                                    moment.duration(Number(task.timeInWork)).days() + " дн., " +
                                    moment.duration(Number(task.timeInWork)).hours() + " ч., " +
                                    moment.duration(Number(task.timeInWork)).minutes() + " мин., " +
                                    moment.duration(Number(task.timeInWork)).seconds() + " сек."
                                })</Typography>:''}
                                {task.dateFinish ? <Typography variant="body2">завершено ({
                                    moment(Number(task.dateFinish)).format("DD.MM.YYYY  HH:mm:ss")
                                })</Typography> :''}
                            </Grid>
                            <Grid item xs="auto">
                                <Stack spacing={0} direction="column">
                                    <IconButton color="success" size="small" onClick={() => updTask(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="primary" size="small" onClick={() => subtaskListModal(task)}>
                                        <FormatListNumberedIcon />
                                    </IconButton>
                                    <IconButton color="info" size="small" onClick={() => commentListModal(task)}>
                                        <MessageIcon />
                                    </IconButton>
                                    <IconButton color="inherit" size="small" onClick={() => fileListModal(task)}>
                                        <AttachFileIcon />
                                    </IconButton>
                                    <IconButton color="error" size="small" onClick={() => delTask(task)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default Task;