import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import './task.css';
import moment from 'moment';
import {Draggable} from 'react-beautiful-dnd';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconTaskTheme,buttonIconTaskHoverTheme,buttonIconTaskSettingsTheme} from '../../css/button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import {MyTooltip} from  '../tooltip/tooltip';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

const Task = ({index,task}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
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
        dispatch({type:'TASK_CURRENT', payload: task});
        dispatch({type:'TASK_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
    };
    /*--------------------------------------------------------------------------*/
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        if(open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    };
    useEffect(()=>{
        if(open){
            dispatch({type:'TASK_SETTINGS_MENU_OPEN', payload: true});
        }else{
            dispatch({type:'TASK_SETTINGS_MENU_OPEN', payload: false});
        }
    },[open]);
    /*--------------------------------------------------------------------------*/
    return (
        <Draggable draggableId={String(task._id)} index={index} isDragDisabled={open}>
            {(provided,snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >
                    <Card
                        sx={{
                            margin:'2px',padding:'2px 2px 2px 2px',border:'2px solid #565bf76e',
                            borderRadius:'15px',backgroundColor: snapshot.isDragging ? "#99e792" : "none"
                        }}
                        className={snapshot.isDragging ? "taskIsDragging" : ""}
                    >
                        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                            <Grid item xs={12} sx={{padding:'1px 2px 1px 2px',lineHeight:'1.1'}}>
                                {task.number ?
                                    <div style={{marginTop:'2px',color:'green',maxHeight:'2rem',overflowY:'hidden'}}>
                                        {task.number}</div> : ''}
                                {task.title ?
                                    <div style={{marginTop:'2px',color:'blue',maxHeight:'2rem',overflowY:'hidden',fontWeight:'700'}}>
                                        {task.title}</div> : ''}
                                {task.description ?
                                    <div style={{marginTop:'2px',color:'black',maxHeight:'4rem',overflowY:'hidden'}}>
                                        {task.description}</div> : ''}
                                {task.timeInWork ?
                                    <div style={{padding:'2px 0px 2px 0px',borderTop:'1px dashed #80808082',color:'gray'}}>
                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                            <Grid item xs="auto">
                                                <AccessTimeTwoToneIcon style={{fontSize:'1.1rem'}}/>&nbsp;
                                            </Grid>
                                            <Grid item xs style={{fontSize:'0.7rem'}}>
                                                {
                                                    moment.duration(Number(task.timeInWork)).days() + " дн. " +
                                                    moment.utc(Number(task.timeInWork)).format("HH:mm:ss")
                                                }
                                            </Grid>
                                        </Grid>
                                    </div> : ''}
                                {task.dateFinish ?
                                    <div style={{padding:'2px 0px 2px 0px',borderTop:'1px dashed #80808082',color:'gray'}}>
                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                            <Grid item xs="auto">
                                                <FlagTwoToneIcon style={{fontSize:'1.2rem'}}/>&nbsp;
                                            </Grid>
                                            <Grid item xs style={{fontSize:'0.7rem'}}>
                                                {moment(Number(task.dateFinish)).format("DD.MM.YYYY HH:mm:ss")}
                                            </Grid>
                                        </Grid>
                                    </div> : ''}
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',alignContent:'center',flexWrap:'wrap'}}>
                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                    {
                                        MyTooltip(
                                            open,
                                            handleTooltipClose,
                                            <ThemeProvider theme={buttonIconTaskTheme}>
                                                <IconButton
                                                    sx={buttonIconTaskHoverTheme}
                                                    className="placementOn10"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => {updTask(task);handleTooltipClose()}}
                                                >
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </ThemeProvider>,
                                            MyTooltip(
                                                open,
                                                handleTooltipClose,
                                                <ThemeProvider theme={buttonIconTaskTheme}>
                                                    <IconButton
                                                        sx={buttonIconTaskHoverTheme}
                                                        className="placementOn11"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => {subtaskListModal(task);handleTooltipClose()}}
                                                    >
                                                        <FormatListNumberedIcon />
                                                    </IconButton>
                                                </ThemeProvider>,
                                                MyTooltip(
                                                    open,
                                                    handleTooltipClose,
                                                    <ThemeProvider theme={buttonIconTaskTheme}>
                                                        <IconButton
                                                            sx={buttonIconTaskHoverTheme}
                                                            className="placementOn01"
                                                            color="info"
                                                            size="small"
                                                            onClick={() => {commentListModal(task);handleTooltipClose()}}
                                                        >
                                                            <ChatTwoToneIcon />
                                                        </IconButton>
                                                    </ThemeProvider>,
                                                    MyTooltip(
                                                        open,
                                                        handleTooltipClose,
                                                        <ThemeProvider theme={buttonIconTaskTheme}>
                                                            <IconButton
                                                                sx={buttonIconTaskHoverTheme}
                                                                className="placementOn02"
                                                                color="info"
                                                                size="small"
                                                                onClick={() => {fileListModal(task);handleTooltipClose()}}
                                                            >
                                                                <AttachFileIcon />
                                                            </IconButton>
                                                        </ThemeProvider>,
                                                        MyTooltip(
                                                            open,
                                                            handleTooltipClose,
                                                            <ThemeProvider theme={buttonIconTaskTheme}>
                                                                <IconButton
                                                                    sx={buttonIconTaskHoverTheme}
                                                                    className="placementOn06"
                                                                    color="error"
                                                                    size="small"
                                                                    onClick={() => {delTask(task);handleTooltipClose()}}
                                                                >
                                                                    <DeleteForeverTwoToneIcon />
                                                                </IconButton>
                                                            </ThemeProvider>,
                                                            <ThemeProvider theme={buttonIconTaskSettingsTheme}>
                                                                <IconButton
                                                                    sx={buttonIconTaskHoverTheme}
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={handleTooltipOpen}>
                                                                    {open ? <CloseIcon /> : <SettingsTwoToneIcon />}
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