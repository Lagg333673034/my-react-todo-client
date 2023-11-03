import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Tasklist from '../components/tasklist/tasklist';
import TaskModal from '../components/modal/taskModal';
import CommentListModal from '../components/modal/commentListModal';
import FileListModal from '../components/modal/fileListModal';
import SubtaskListModal from '../components/modal/subtaskListModal';
import {fetchTasks,updateTask} from "../actions/taskActions";
import {useParams} from "react-router-dom";
import './PageTasks.css';
import moment from 'moment';
import {DragDropContext} from 'react-beautiful-dnd';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonTheme} from '../css/buttons';

const PageTasks = () => {
    const dispatch = useDispatch();
    const currentProjectId = useParams().id;
    useEffect(()=>{
        dispatch({type:"TASK_CURRENT",payload:null});
    },[]);
    /*--------------------------------------------------------------------------*/
    const [searchTasksString,setSearchTasksString] = useState('');
    const [searchTasksStringTemp, setSearchTasksStringTemp] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTasksString(searchTasksStringTemp)
        }, 500);
        return () => clearTimeout(timer)
    }, [searchTasksStringTemp]);
    /*--------------------------------------------------------------------------*/
    const taskModalVisibleSelector = useSelector((state)=>state.taskReducer.taskModalVisible);
    const [taskModalVisible, setTaskModalVisible] = useState(taskModalVisibleSelector);
    useEffect(()=>{
        setTaskModalVisible(taskModalVisibleSelector);
    },[taskModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const commentListModalVisibleSelector = useSelector((state)=>state.commentReducer.commentListModalVisible);
    const [commentListModalVisible, setCommentListModalVisible] = useState(commentListModalVisibleSelector);
    useEffect(()=>{
        setCommentListModalVisible(commentListModalVisibleSelector);
    },[commentListModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const fileListModalVisibleSelector = useSelector((state)=>state.fileReducer.fileListModalVisible);
    const [fileListModalVisible, setFileListModalVisible] = useState(fileListModalVisibleSelector);
    useEffect(()=>{
        setFileListModalVisible(fileListModalVisibleSelector);
    },[fileListModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const subtaskListModalVisibleSelector = useSelector((state)=>state.subtaskReducer.subtaskListModalVisible);
    const [subtaskListModalVisible, setSubtaskListModalVisible] = useState(subtaskListModalVisibleSelector);
    useEffect(()=>{
        setSubtaskListModalVisible(subtaskListModalVisibleSelector);
    },[subtaskListModalVisibleSelector]);
    /*--------------------------------------------------------------------------------*/
    const taskFetchAll = useSelector((state)=>state.taskReducer.tasks);
    const [tasks, setTasks] = useState(taskFetchAll);
    const [tasksLoading, setTasksLoading] = useState(false);
    useEffect(()=>{
        setTasks(taskFetchAll);
    },[taskFetchAll]);

    useEffect(()=>{
        if(
            currentProjectId && currentProjectId.length>0 &&
            !taskModalVisible && !tasksLoading
        ) {
            setTasksLoading(true);
            setTasks(taskFetchAll);
            dispatch(fetchTasks(currentProjectId)).finally(() => setTasksLoading(false));
        }
    },[currentProjectId,taskModalVisible]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(currentProjectId && currentProjectId.length>0){
                dispatch(fetchTasks(currentProjectId));
            }
        }, 1115000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------*/
    const projectCurrent = useSelector((state)=>state.projectReducer.projectCurrent);
    const [projectCurrentState, setProjectCurrentState] = useState(projectCurrent);
    useEffect(()=>{
        setProjectCurrentState(projectCurrent);
    },[projectCurrent]);
    /*--------------------------------------------------------------------------*/
    const columns = [
        {title:"В очереди",status:"1"},
        {title:"В работе",status:"2"},
        {title:"Завершено",status:"3"}
    ];
    const onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if(!destination){
            return;
        }
        if(
            destination.droppableId === source.droppableId
        ){
            return;
        }

        const column = destination.droppableId;
        const draggableTask =
            tasks &&
            tasks.length>0 &&
            tasks.filter(task => task._id === draggableId)[0];

        if(draggableTask) {
            if (column === '1') {
                draggableTask.timeInWorkStart = '';
                draggableTask.timeInWorkFinish = '';
                draggableTask.timeInWork = String(
                    (draggableTask.timeInWork && draggableTask.timeInWork.length > 0 ? Number(draggableTask.timeInWork) : 0)
                    +
                    (draggableTask.timeInWorkStart && draggableTask.timeInWorkStart.length > 0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(draggableTask.timeInWorkStart)) : 0)
                );
                draggableTask.dateFinish = '';
                draggableTask.status = column;
            }
            if (column === '2') {
                draggableTask.timeInWorkStart = String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf());
                draggableTask.timeInWorkFinish = '';
                draggableTask.dateFinish = '';
                draggableTask.status = column;
            }
            if (column === '3') {
                draggableTask.timeInWorkFinish = String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf());
                draggableTask.timeInWork = String(
                    (draggableTask.timeInWork && draggableTask.timeInWork.length > 0 ? Number(draggableTask.timeInWork) : 0)
                    +
                    (draggableTask.timeInWorkStart && draggableTask.timeInWorkStart.length > 0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(draggableTask.timeInWorkStart)) : 0)
                );
                draggableTask.dateFinish = String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf());
                draggableTask.status = column;
            }
            dispatch(updateTask(draggableTask._id, draggableTask));
        }
    };
    /*--------------------------------------------------------------------------*/
    return(
        <>
        <Grid
            container direction="row" justifyContent="flex-start" alignItems="center"
            spacing={2} sx={{padding:'5px 5px 5px 5px'}}
        >
            <Grid item xs="auto">
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        variant="contained" color="primary" size="small"
                        startIcon={<AddBoxIcon/>}
                        onClick={() => dispatch({type:'TASK_MODAL_VISIBLE', payload: true})}
                    >
                        Добавить задачу
                    </Button>
                </ThemeProvider>
            </Grid>
            <Grid item xs>
                <TextField
                    hiddenLabel placeholder="поиск ..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard" sx={{width:'100%'}}
                    onChange={(e) => setSearchTasksStringTemp(e.target.value)}
                />
            </Grid>
        </Grid>
        <div className="titleTask">
            {projectCurrentState && projectCurrentState.title}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                {
                    columns &&
                    columns.length>0 &&
                    columns.map((column,column_index) => {
                        const columnTasks =
                        tasks &&
                        tasks.length>0 &&
                        tasks.filter(task => task.status === column.status);
                        return (
                            <Grid item xs={4} key={column_index}>
                                <Tasklist
                                    column={column}
                                    tasks={columnTasks}
                                    searchTasksString={searchTasksString}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </DragDropContext>
        {taskModalVisible ? <TaskModal show={taskModalVisible}/>  : ''}
        {commentListModalVisible ? <CommentListModal show={commentListModalVisible}/>  : ''}
        {fileListModalVisible ? <FileListModal show={fileListModalVisible}/>  : ''}
        {subtaskListModalVisible ? <SubtaskListModal show={subtaskListModalVisible}/>  : ''}
        </>
    )
};

export default PageTasks;
