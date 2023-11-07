import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Tasklist from '../components/tasklist/tasklist';
import TaskModal from '../components/modal/taskModal';
import CommentListModal from '../components/modal/commentListModal';
import FileListModal from '../components/modal/fileListModal';
import SubtaskListModal from '../components/modal/subtaskListModal';
import TaskDelConfirmModal from '../components/modal/taskDelConfirmModal';
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
    const documentVisible = useSelector((state)=>state.websiteReducer.documentVisible);
    const documentVisibility = () => {
        if (document.hidden) {
            dispatch({type: 'DOCUMENT_VISIBLE', payload: false});
        } else {
            dispatch({type: 'DOCUMENT_VISIBLE', payload: true});
        }
    };
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
    const taskModalVisible = useSelector((state)=>state.taskReducer.taskModalVisible);
    const commentListModalVisible = useSelector((state)=>state.commentReducer.commentListModalVisible);
    const fileListModalVisible = useSelector((state)=>state.fileReducer.fileListModalVisible);
    const subtaskListModalVisible = useSelector((state)=>state.subtaskReducer.subtaskListModalVisible);
    const taskDelConfirmModalVisible = useSelector((state)=>state.taskReducer.taskDelConfirmModalVisible);
    const taskFetchAll = useSelector((state)=>state.taskReducer.tasks);
    /*--------------------------------------------------------------------------------*/
    const [tasks, setTasks] = useState(taskFetchAll);
    const [tasksLoading, setTasksLoading] = useState(false);
    useEffect(()=>{
        if(!tasksLoading)
            setTasks(taskFetchAll);
    },[taskFetchAll,tasksLoading]);

    useEffect(()=>{
        if(
            documentVisible &&
            currentProjectId && currentProjectId.length>0 &&
            !taskModalVisible && !taskDelConfirmModalVisible &&
            !tasksLoading
        ) {
            setTasksLoading(true);
            setTasks(taskFetchAll);
            dispatch(fetchTasks(currentProjectId)).finally(() => setTasksLoading(false));
        }
    },[currentProjectId,taskModalVisible,taskDelConfirmModalVisible]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                documentVisible &&
                currentProjectId && currentProjectId.length>0 &&
                !tasksLoading
            ){
                dispatch(fetchTasks(currentProjectId));
                console.log("==2");
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------*/
    const projectCurrent = useSelector((state)=>state.projectReducer.projectCurrent);
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

        if(draggableTask && draggableTask.timeInWork) {
            if (column === '1') {
                draggableTask.timeInWork = String(
                    Number(draggableTask.timeInWork.length > 0 ?
                        Number(draggableTask.timeInWork)
                        : Number(0))
                    +
                    Number(draggableTask.timeInWorkStart.length > 0 ?
                        Number(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(draggableTask.timeInWorkStart))
                        : Number(0))
                );
                draggableTask.timeInWorkStart = '';
                draggableTask.timeInWorkFinish = '';
                draggableTask.dateFinish = '';
                draggableTask.status = column;
            }
            if (column === '2') {
                draggableTask.timeInWorkStart = moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf();
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
    const [key,setKey] = useState(false);

    const subtaskDelConfirmModalVisible = useSelector((state)=>state.subtaskReducer.subtaskDelConfirmModalVisible);
    const commentDelConfirmModalVisible = useSelector((state)=>state.commentReducer.commentDelConfirmModalVisible);
    const fileDelConfirmModalVisible = useSelector((state)=>state.fileReducer.fileDelConfirmModalVisible);

    const subtaskModalVisible = useSelector((state)=>state.subtaskReducer.subtaskModalVisible);
    const commentModalVisible = useSelector((state)=>state.commentReducer.commentModalVisible);

    useEffect(() => {
        if(key && key === 27) {
            switch(true){
                case subtaskDelConfirmModalVisible:
                    dispatch({type: 'SUBTASK_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
                    break;
                case commentDelConfirmModalVisible:
                    dispatch({type: 'COMMENT_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
                    break;
                case fileDelConfirmModalVisible:
                    dispatch({type: 'FILE_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
                    break;

                case subtaskModalVisible:
                    dispatch({type: 'SUBTASK_MODAL_VISIBLE', payload: false});
                    break;
                case commentModalVisible:
                    dispatch({type: 'COMMENT_MODAL_VISIBLE', payload: false});
                    break;

                default:
                    dispatch({type: 'SUBTASK_LIST_MODAL_VISIBLE', payload: false});
                    dispatch({type: 'COMMENT_LIST_MODAL_VISIBLE', payload: false});
                    dispatch({type: 'FILE_LIST_MODAL_VISIBLE', payload: false});
                    dispatch({type: 'TASK_MODAL_VISIBLE', payload: false});
                    dispatch({type: 'TASK_DEL_CONFIRM_MODAL_VISIBLE', payload: false});
                    dispatch({type: "TASK_CURRENT", payload: null});
                    break;
            }
        }
        setKey(false);
    },[key]);
    /*--------------------------------------------------------------------------*/
    useEffect(() => {
        window.addEventListener('keydown', (event)=>setKey(event.keyCode));
        document.addEventListener( 'visibilitychange' , documentVisibility, false );
        return () => {
            window.removeEventListener('keydown', (event)=>setKey(event.keyCode));
            document.removeEventListener( 'visibilitychange' , documentVisibility, false );
        };
    },[]);
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
            {projectCurrent && projectCurrent.title ? projectCurrent.title : ''}
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
        {taskDelConfirmModalVisible ? <TaskDelConfirmModal show={taskDelConfirmModalVisible}/>  : ''}
        </>
    )
};

export default PageTasks;
