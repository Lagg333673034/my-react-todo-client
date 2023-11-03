import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask} from "../../actions/taskActions";
import './task.css';
import moment from 'moment';
import {Draggable} from 'react-beautiful-dnd';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconTaskTheme,buttonIconTaskHover,buttonIconTaskSettingsTheme} from '../../css/buttons';

import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import '../../css/tooltip.css';
import Zoom from '@mui/material/Zoom';
import Box from "@mui/material/Box/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

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
    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        if(open){
            setOpen(false)
        }else{
            setOpen(true)
        }
    };
    const MyTooltip = (title,children) => {
        return (
            <Box>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    disableFocusListener disableHoverListener disableTouchListener
                    open={open} onClose={handleTooltipClose}
                    TransitionComponent={Zoom}
                    title={title}
                >
                    <Box>
                        {children}
                    </Box>
                </Tooltip>
            </Box>
        )
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Draggable draggableId={String(task._id)} index={index}>
            {(provided,snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >
                    <Card
                        sx={{
                            margin:'5px',padding:'5px 5px 0px 5px',border:'2px solid #565bf76e',
                            borderRadius:'15px',backgroundColor: snapshot.isDragging ? "#99e792" : "none"
                        }}
                        className={snapshot.isDragging ? "taskIsDragging" : ""}
                    >
                        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                            <Grid item xs={12} sx={{padding:'5px 5px 0px 5px'}}>
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
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignContent:'center',flexWrap:'wrap'}}>
                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                    {
                                        MyTooltip(
                                            <ThemeProvider theme={buttonIconTaskTheme}>
                                                <IconButton
                                                    sx={buttonIconTaskHover}
                                                    className="placementOn10"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => {updTask(task);handleTooltipClose()}}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </ThemeProvider>,
                                            MyTooltip(
                                                <ThemeProvider theme={buttonIconTaskTheme}>
                                                    <IconButton
                                                        sx={buttonIconTaskHover}
                                                        className="placementOn11"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => {subtaskListModal(task);handleTooltipClose()}}
                                                    >
                                                        <FormatListNumberedIcon />
                                                    </IconButton>
                                                </ThemeProvider>,
                                                MyTooltip(
                                                    <ThemeProvider theme={buttonIconTaskTheme}>
                                                        <IconButton
                                                            sx={buttonIconTaskHover}
                                                            className="placementOn01"
                                                            color="info"
                                                            size="small"
                                                            onClick={() => {commentListModal(task);handleTooltipClose()}}
                                                        >
                                                            <MessageIcon />
                                                        </IconButton>
                                                    </ThemeProvider>,
                                                    MyTooltip(
                                                        <ThemeProvider theme={buttonIconTaskTheme}>
                                                            <IconButton
                                                                sx={buttonIconTaskHover}
                                                                className="placementOn02"
                                                                color="info"
                                                                size="small"
                                                                onClick={() => {fileListModal(task);handleTooltipClose()}}
                                                            >
                                                                <AttachFileIcon />
                                                            </IconButton>
                                                        </ThemeProvider>,
                                                        MyTooltip(
                                                            <ThemeProvider theme={buttonIconTaskTheme}>
                                                                <IconButton
                                                                    sx={buttonIconTaskHover}
                                                                    className="placementOn06"
                                                                    color="error"
                                                                    size="small"
                                                                    onClick={() => {delTask(task);handleTooltipClose()}}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ThemeProvider>,


                                                            <ThemeProvider theme={buttonIconTaskSettingsTheme}>
                                                                <IconButton
                                                                    sx={buttonIconTaskHover}
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={handleTooltipOpen}>
                                                                    {open ? <CloseIcon /> : <SettingsIcon />}
                                                                </IconButton>
                                                            </ThemeProvider>

                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    }
                                </ClickAwayListener>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default Task;