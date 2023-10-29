import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import TaskModal from '../components/modal/taskModal';
import CommentModal from '../components/modal/commentModal';
import FileModal from '../components/modal/fileModal';
import Tasklist from '../components/tasklist/tasklist';
import {fetchProject,fetchTasks,updateTask} from "../api";

import {useParams} from "react-router-dom";
import './PageTasks.css';
import moment from 'moment';
import {DragDropContext} from 'react-beautiful-dnd';


const PageTasks = () => {
    const dispatch = useDispatch();
    const currentProjectId = useParams().id;
    useEffect(()=>{
        localStorage.removeItem('taskCurrentId');
    },[]);
    /*--------------------------------------------------------------------------*/
    const [searchTasksString,setSearchTasksString] = useState('');
    /*--------------------------------------------------------------------------*/
    const [searchTemp, setSearchTemp] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTasksString(searchTemp)
        }, 500);
        return () => clearTimeout(timer)
    }, [searchTemp]);
    /*--------------------------------------------------------------------------*/
    const taskModalVisibleSelector = useSelector((state)=>state.taskReducer.taskModalVisible);
    const [taskModalVisible, setTaskModalVisible] = useState(taskModalVisibleSelector);
    useEffect(()=>{
        setTaskModalVisible(taskModalVisibleSelector);
    },[taskModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const commentModalVisibleSelector = useSelector((state)=>state.commentReducer.commentModalVisible);
    const [commentModalVisible, setCommentModalVisible] = useState(commentModalVisibleSelector);
    useEffect(()=>{
        setCommentModalVisible(commentModalVisibleSelector);
    },[commentModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const fileModalVisibleSelector = useSelector((state)=>state.fileReducer.fileModalVisible);
    const [fileModalVisible, setFileModalVisible] = useState(fileModalVisibleSelector);
    useEffect(()=>{
        setFileModalVisible(fileModalVisibleSelector);
    },[fileModalVisibleSelector]);
    /*--------------------------------------------------------------------------*/
    const [tasks, setTasksData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(currentProjectId && currentProjectId.length>5) {
            setLoading(true);
            fetchTasks(currentProjectId).then(response => setTasksData(response.data)).finally(() => setLoading(false));
        }
    },[currentProjectId]);
    useEffect(()=>{
        if(
            !loading &&
            currentProjectId && currentProjectId.length>5 &&
            !taskModalVisible && !commentModalVisible && !fileModalVisible

        ) {
            let timerId = setInterval(() => {
                fetchTasks(currentProjectId).then(response => setTasksData(response.data));
            }, 3000);
            return ()=>{
                clearInterval(timerId)
            }
        }
    },[loading,currentProjectId,taskModalVisible,commentModalVisible,fileModalVisible]);
    /*--------------------------------------------------------------------------*/
    const [project, setProjectData] = useState({});
    useEffect(()=>{
        if(currentProjectId && currentProjectId.length>5) {
            fetchProject(currentProjectId).then(response => setProjectData(response.data[0]));
        }
    },[currentProjectId]);
    /*--------------------------------------------------------------------------*/
    const columns = [
        {title:"В очереди",status:"1"},
        {title:"В работе",status:"2"},
        {title:"Завершено",status:"3"}
    ];
    /*--------------------------------------------------------------------------*/
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

        if (column === '1') {
            updateTask(
                draggableTask._id,
                {
                    timeInWorkStart: '',
                    timeInWorkFinish: '',
                    timeInWork: String(
                        (draggableTask.timeInWork && draggableTask.timeInWork.length > 0 ? Number(draggableTask.timeInWork) : 0)
                        +
                        (draggableTask.timeInWorkStart && draggableTask.timeInWorkStart.length > 0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(draggableTask.timeInWorkStart)) : 0)
                    ),
                    dateFinish: '',
                }
            );
        }
        if (column === '2') {
            updateTask(
                draggableTask._id,
                {
                    timeInWorkStart: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWorkFinish: '',
                    //timeInWork: '',
                    dateFinish: '',
                }
            );
        }
        if (column === '3') {
            updateTask(
                draggableTask._id,
                {
                    //timeInWorkStart: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWorkFinish: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWork: String(
                        (draggableTask.timeInWork && draggableTask.timeInWork.length > 0 ? Number(draggableTask.timeInWork) : 0)
                        +
                        (draggableTask.timeInWorkStart && draggableTask.timeInWorkStart.length > 0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(draggableTask.timeInWorkStart)) : 0)
                    ),
                    dateFinish: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf())
                }
            );
        }
        updateTask(draggableTask._id, {status: column});
    };
    /*--------------------------------------------------------------------------*/
    return(
        <>
        <div className="tools">
            <button
                className="btn btnAdd"
                type="button"
                onClick={() => dispatch({type:'TASK_MODAL_VISIBLE', payload: true})}
            >
                Добавить задачу
            </button>
            <input type="text" onChange={(e) => setSearchTemp(e.target.value)} placeholder="поиск ..." />
        </div>
        <div className="title">
            {project.title}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            {
                columns &&
                columns.length>0 &&
                columns.map((column,column_index) => {
                    const columnTasks =
                    tasks &&
                    tasks.length>0 &&
                    tasks.filter(task => task.status === column.status);
                    return (
                        <Tasklist
                            key={column_index}
                            column={column}
                            tasks={columnTasks}
                            searchTasksString={searchTasksString}
                        />
                    )
                })
            }
        </DragDropContext>
        {taskModalVisible ? <TaskModal show={taskModalVisible}/>  : ''}
        {commentModalVisible ? <CommentModal show={commentModalVisible}/>  : ''}
        {fileModalVisible ? <FileModal show={fileModalVisible}/>  : ''}
        </>
    )
};

export default PageTasks;
