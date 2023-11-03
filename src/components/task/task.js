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
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconTaskTheme} from '../../css/buttons';



/*import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';*/



/*import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import '../../css/speedDial.css';*/


import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import '../../css/tooltip.css';
import Zoom from '@mui/material/Zoom';



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

    /*const actions = [
        { icon: <FileCopyIcon /> },
        { icon: <SaveIcon /> },
        { icon: <PrintIcon /> },
        { icon: <ShareIcon /> },
    ];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);*/

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
                    <Card sx={{margin:'5px',padding:'5px 5px 5px 5px',border:'2px solid #565bf76e',borderRadius:'15px'}}>
                        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                            <Grid item xs={12} sx={{padding:'5px'}}>
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

                                {/*<ThemeProvider theme={buttonIconTaskTheme}>
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
                                </ThemeProvider>*/}

                                {/*<Backdrop open={open} />
                                <SpeedDial
                                    ariaLabel="SpeedDial tooltip example"
                                    sx={{ }}
                                    icon={<SpeedDialIcon />}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    open={open}
                                >
                                    {actions.map((action,index_action) => (
                                        <SpeedDialAction
                                            key={index_action}
                                            icon={action.icon}
                                            tooltipOpen
                                            onClick={handleClose}
                                        />
                                    ))}
                                </SpeedDial>*/}





                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                    <ThemeProvider theme={buttonIconTaskTheme}>

                                        <Tooltip
                                            placement="left-end"
                                            disableFocusListener disableHoverListener disableTouchListener
                                            open={open} onClose={handleTooltipClose}
                                            TransitionComponent={Zoom}
                                            title={
                                                <IconButton color="primary" size="small" onClick={() => subtaskListModal(task)}>
                                                    <FormatListNumberedIcon />
                                                </IconButton>
                                            }
                                        >
                                            <Tooltip
                                                placement="top"
                                                disableFocusListener disableHoverListener disableTouchListener
                                                open={open} onClose={handleTooltipClose}
                                                TransitionComponent={Zoom}
                                                title={
                                                    <IconButton color="primary" size="small" onClick={() => subtaskListModal(task)}>
                                                        <FormatListNumberedIcon />
                                                    </IconButton>
                                                }
                                            >
                                                <Tooltip
                                                    placement="top-start"

                                                    disableFocusListener disableHoverListener disableTouchListener
                                                    open={open} onClose={handleTooltipClose}
                                                    TransitionComponent={Zoom}
                                                    title={
                                                        <IconButton className="top-start" color="primary" size="small" onClick={() => subtaskListModal(task)}>
                                                            <FormatListNumberedIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    <Tooltip
                                                        placement="top-end"
                                                        disableFocusListener disableHoverListener disableTouchListener
                                                        open={open} onClose={handleTooltipClose}
                                                        TransitionComponent={Zoom}
                                                        title={

                                                            <IconButton color="primary" size="small" onClick={() => subtaskListModal(task)}>
                                                                <FormatListNumberedIcon />
                                                            </IconButton>

                                                        }
                                                    >
                                                        <Tooltip
                                                            placement="right-end"
                                                            disableFocusListener disableHoverListener disableTouchListener
                                                            open={open} onClose={handleTooltipClose}
                                                            TransitionComponent={Zoom}
                                                            title={
                                                                <IconButton color="success" size="small" onClick={() => updTask(task)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            }
                                                        >
                                                            <Tooltip
                                                                placement="bottom"
                                                                disableFocusListener disableHoverListener disableTouchListener
                                                                open={open} onClose={handleTooltipClose}
                                                                TransitionComponent={Zoom}
                                                                title={
                                                                    <IconButton color="success" size="small" onClick={() => updTask(task)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <Button onClick={handleTooltipOpen}>Clickhfghfghfhfgh</Button>
                                                            </Tooltip>
                                                        </Tooltip>
                                                    </Tooltip>
                                                </Tooltip>
                                            </Tooltip>
                                        </Tooltip>

                                    </ThemeProvider>
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