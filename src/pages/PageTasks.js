import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import TaskModal from '../components/modal/taskModal';
import CommentModal from '../components/modal/commentModal';
import FileModal from '../components/modal/fileModal';
import Task from '../components/task/task';
import {fetchProject,fetchTasks,updateTask} from "../api";
import useInput from "../components/hooks/useInput";
import {useParams} from "react-router-dom";
import './PageTasks.css';
import moment from 'moment';

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
            }, 2000);
            return ()=>{
                clearInterval(timerId)
            }
        }
    },[taskModalVisible,commentModalVisible,fileModalVisible]);
    /*--------------------------------------------------------------------------*/
    const [project, setProjectData] = useState({});
    useEffect(()=>{
        if(currentProjectId && currentProjectId.length>5) {
            fetchProject(currentProjectId).then(response => setProjectData(response.data[0]));
        }
    },[currentProjectId]);
    /*--------------------------------------------------------------------------*/
    const [cols,setCols] = useState([
        {title:"В очереди",status:"1"},
        {title:"В работе",status:"2"},
        {title:"Завершено",status:"3"}
    ]);
    const [currentTask,setCurrentTask] = useState(null);

    function dragOverHandler(e) {
        e.preventDefault();
    }
    function dragStartHandler(e, col, task) {
        setCurrentTask(task);
    }
    function dropConditionHandler(e,col) {
        if(col.status === '1'){
            updateTask(
                currentTask._id,
                {
                    timeInWorkStart: '',
                    timeInWorkFinish: '',
                    timeInWork:String(
                        (currentTask.timeInWork && currentTask.timeInWork.length>0 ? Number(currentTask.timeInWork) : 0)
                        +
                        (currentTask.timeInWorkStart && currentTask.timeInWorkStart.length>0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(currentTask.timeInWorkStart)) : 0)
                    ),
                    dateFinish: '',
                }
            );
        }
        if(col.status === '2'){
            updateTask(
                currentTask._id,
                {
                    timeInWorkStart: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWorkFinish: '',
                    //timeInWork: '',
                    dateFinish: '',
                }
            );
        }
        if(col.status === '3'){
            updateTask(
                currentTask._id,
                {
                    //timeInWorkStart: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWorkFinish: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf()),
                    timeInWork: String(
                        (currentTask.timeInWork && currentTask.timeInWork.length>0 ? Number(currentTask.timeInWork) : 0)
                        +
                        (currentTask.timeInWorkStart && currentTask.timeInWorkStart.length>0 ? (moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf() - Number(currentTask.timeInWorkStart)) : 0)
                    ),
                    dateFinish: String(moment(new Date(), "YYYY-MM-DD-HH-mm-ss").valueOf())
                }
            );
        }

        updateTask(
            currentTask._id,
            {
                status: String(col.status)
            }
        );
    }
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
        <div>
            {cols.length && cols.length>0 && cols.map((col,col_index) =>
                <div
                    key={col_index}
                    className="condition"
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropConditionHandler(e, col)}
                >
                    <div className="condition__title">{col.title}</div>
                    {tasks.length && tasks.length > 0 &&
                    tasks
                        .filter(task =>
                            (task.number && task.number.toLowerCase().includes(searchTasksString.toLowerCase())) ||
                            (task.title && task.title.toLowerCase().includes(searchTasksString.toLowerCase())) ||
                            (task.description && task.description.toLowerCase().includes(searchTasksString.toLowerCase()))
                        )
                        .sort((a, b) => b.priority.localeCompare(a.priority))
                        .map((task, task_index) => {
                            if (
                                (col.status && col.status > 0) &&
                                (task.status && task.status > 0) &&
                                (task.status === col.status)
                            )
                                return (
                                    <Task
                                        key={task_index}
                                        task_index={col_index+task_index}
                                        draggable={true}
                                        onDragOver={(e) => dragOverHandler(e)}
                                        onDragStart={(e) => dragStartHandler(e, col, task)}
                                        task={task}
                                    />
                                )
                    })}
                </div>
            )}
        </div>
        {taskModalVisible ? <TaskModal show={taskModalVisible}/>  : ''}
        {commentModalVisible ? <CommentModal show={commentModalVisible}/>  : ''}
        {fileModalVisible ? <FileModal show={fileModalVisible}/>  : ''}
        </>
    )
};

export default PageTasks;
