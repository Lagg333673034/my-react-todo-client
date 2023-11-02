import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchSubtasks} from "../../actions/subtaskActions";
import Subtask from "../subtask/subtask";
import SubtaskModal from "./subtaskModal";

const SubtaskListModal = ({show}) => {
    const dispatch = useDispatch();
    let subtaskListModalVisibleSelector = useSelector((state)=>state.subtaskReducer.subtaskListModalVisible);
    /*useEffect(()=>{
        dispatch({type:"SUBTASK_CURRENT",payload:null});
    },[]);*/
    /*--------------------------------------------------------------------------------*/
    const subtaskModalVisibleSelector = useSelector((state)=>state.subtaskReducer.subtaskModalVisible);
    const [subtaskModalVisible, setSubtaskModalVisible] = useState(subtaskModalVisibleSelector);
    useEffect(()=>{
        setSubtaskModalVisible(subtaskModalVisibleSelector);
    },[subtaskModalVisibleSelector]);
    /*--------------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const subtaskFetchAll = useSelector((state)=>state.subtaskReducer.subtasks);
    const [subtasks, setSubtasks] = useState(subtaskFetchAll);
    const [subtasksLoading, setSubtasksLoading] = useState(false);
    useEffect(()=>{
        if(subtaskListModalVisibleSelector) {
            setSubtasks(subtaskFetchAll);
        }
    },[subtaskFetchAll]);

    useEffect(()=>{
        if(
            taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0 &&
            !subtaskModalVisible && !subtasksLoading && subtaskListModalVisibleSelector
        ) {
            setSubtasksLoading(true);
            dispatch(fetchSubtasks(taskCurrentState._id)).finally(() => setSubtasksLoading(false));
        }
    },[subtaskFetchAll]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0 &&
                subtaskListModalVisibleSelector
            ){
                dispatch(fetchSubtasks(taskCurrentState._id));
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        subtaskListModalVisibleSelector = false;
        setSubtasks({});
        dispatch({type:'SUBTASK_FETCH_ALL', payload: []});
        dispatch({type:'SUBTASK_LIST_MODAL_VISIBLE', payload: false});
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
                <div className="modal-title"></div>
                <div className="modal-content">
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
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                </div>
            </div>
            {subtaskModalVisible ? <SubtaskModal show={subtaskModalVisible}/>  : ''}
        </div>
    )
};

export default SubtaskListModal;