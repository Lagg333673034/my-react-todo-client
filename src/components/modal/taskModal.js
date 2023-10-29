import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import SubtaskModal from './subtaskModal';
import {fetchTask,createTask,updateTask,fetchSubtasks} from "../../api";
import {useParams} from "react-router-dom";
import moment from 'moment';
import Subtask from "../subtask/subtask";

const TaskModal = ({show}) => {
    const dispatch = useDispatch();
    const [taskData,setTaskData] = useState({});
    /*--------------------------------------------------------------------------------*/
    const submodalVisible = useSelector((state)=>state.subtaskReducer.subtaskModalVisible);
    const [subtaskModalVisible, setSubtaskModalVisible] = useState(submodalVisible);
    useEffect(()=>{
        setSubtaskModalVisible(submodalVisible);
    },[submodalVisible]);
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = useParams().id;
    const currentTaskId = localStorage.getItem('taskCurrentId');
    useEffect(()=>{
        if(
            currentProjectId && currentProjectId.length>5 &&
            currentTaskId && currentTaskId.length>5
        ) {
            fetchTask(currentProjectId,currentTaskId).then(response => setTaskData(response.data[0]));
        }
    },[currentProjectId,currentTaskId]);
    /*--------------------------------------------------------------------------------*/
    const taskAdd = (e) => {
        e.preventDefault();
        createTask(
            currentProjectId,
            {
                number: String(taskData.number || ''),
                title: String(taskData.title || ''),
                description: String(taskData.description || ''),
                dateCreate: String(moment(new Date(), "YYYY-MM-DD").valueOf()),
                priority: String(taskData.priority || '2'),
                status: String('1')
            }
        );
        modalClose();
        //let t1 = moment(new Date(), "YYYY-MM-DD").valueOf();
        //console.log(moment(t1).format("YYYY-MM-DD"));
    };
    const taskUpd = (e) => {
        e.preventDefault();
        updateTask(
            currentTaskId,
            {
                number: String(taskData.number || ''),
                title: String(taskData.title || ''),
                description: String(taskData.description || ''),
                priority: String(taskData.priority || '2'),
            }
        );
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const [subtasks, setSubtasks] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if((!subtaskModalVisible && currentTaskId)) {
            setLoading(true);
            fetchSubtasks(currentTaskId)
                .then(response => setSubtasks(response.data))
                .finally(() => setLoading(false));
        }
    },[currentTaskId,subtaskModalVisible]);
    useEffect(()=>{
        if((!loading && !subtaskModalVisible && currentTaskId)) {
            let timerId = setInterval(() => {
                fetchSubtasks(currentTaskId).then(response => setSubtasks(response.data));
            }, 2000);
            return ()=>{
                clearInterval(timerId);
            }
        }
    },[loading,currentTaskId,subtaskModalVisible]);
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setTaskData({});
        localStorage.removeItem('taskCurrentId');
        dispatch({type:'TASK_MODAL_VISIBLE', payload: false});
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
                    {currentTaskId && currentTaskId.length>5 ? 'Редактировать задачу' : 'Добавить задачу'}
                </div>
                <div className="modal-content">
                    <div style={{width:'100%'}}>
                        <div className="title">
                            Задача
                        </div>
                        <div className="inputOut">
                            Номер задачи
                            <input
                                className="inputIn"
                                type="text"
                                id="taskNumber"
                                autoComplete="off"
                                value={taskData.number ? taskData.number : ''}
                                onChange={(e) => setTaskData({...taskData, number:e.target.value})}
                            />
                        </div>
                        <div className="inputOut">
                            Заголовок
                            <input
                                className="inputIn"
                                type="text"
                                id="taskTitle"
                                autoComplete="off"
                                value={taskData.title ? taskData.title : ''}
                                onChange={(e) => setTaskData({...taskData, title:e.target.value})}
                            />
                        </div>
                        <div className="inputOut">
                            Описание
                            <input
                                className="inputIn"
                                type="text"
                                id="taskDescription"
                                autoComplete="off"
                                value={taskData.description ? taskData.description : ''}
                                onChange={(e) => setTaskData({...taskData, description:e.target.value})}
                            />
                        </div>
                        <div className="inputOut">
                            Приоритет
                            <select
                                className="inputIn"
                                id="taskPriority"
                                value={taskData.priority ? taskData.priority : '2'}
                                onChange={(e) => setTaskData({...taskData, priority:e.target.value})}
                            >
                                <option value="1">Низкий</option>
                                <option value="2">Нормальный</option>
                                <option value="3">Высокий</option>
                            </select>
                        </div>
                        <div className="inputOut">
                            <button
                                className="btn btnAdd"
                                type="button"
                                onClick={() => dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: true})}
                            >
                                Добавить подзадачу
                            </button>
                            <div style={{height:'200px', border:'1px solid black',overflowY:'auto'}}>
                                {
                                    subtasks &&
                                    subtasks.length > 0 &&
                                    subtasks.map((subtask, subtask_index) =>
                                        <Subtask
                                            key={subtask_index}
                                            subtask={subtask}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                    {currentTaskId && currentTaskId.length>5 ?
                        <button className="btn btnAdd" type="button" onClick={taskUpd}>Сохранить изменения</button>
                        :
                        <button className="btn btnAdd" type="button" onClick={taskAdd}>Добавить задачу</button>
                    }
                </div>
            </div>
            {subtaskModalVisible ? <SubtaskModal show={subtaskModalVisible}/>  : ''}
        </div>
    )
};

export default TaskModal;