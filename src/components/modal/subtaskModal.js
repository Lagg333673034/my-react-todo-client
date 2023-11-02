import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createSubtask,updateSubtask} from "../../actions/subtaskActions";

const SubtaskModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const subtaskCurrent = useSelector((state)=>state.subtaskReducer.subtaskCurrent);
    const [subtaskCurrentState, setSubtaskCurrentState] = useState(subtaskCurrent);
    useEffect(()=>{
        setSubtaskCurrentState(subtaskCurrent);
    },[subtaskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const subtaskAdd = (e) => {
        if(taskCurrentState && taskCurrentState._id) {
            dispatch(
                createSubtask(taskCurrentState._id, {
                    description: String(subtaskCurrentState.description || ''),
                    done: String(''),
                }
            ));
            modalClose();
        }
    };
    const subtaskUpd = (e) => {
        if(subtaskCurrentState && subtaskCurrentState._id) {
            dispatch(
                updateSubtask(
                    subtaskCurrentState._id, {
                        description: String(subtaskCurrentState.description || ''),
                    }
                )
            );
            modalClose();
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setSubtaskCurrentState({});
        dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: false});
        dispatch({type:'SUBTASK_CURRENT', payload: null});
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
                    {subtaskCurrentState && subtaskCurrentState._id && subtaskCurrentState._id.length>5 ? 'Редактировать подзадачу' : 'Добавить подзадачу'}
                </div>
                <div className="modal-content">
                    <div className="inputOut">
                        Описание
                        <input
                            className="inputIn"
                            type="text"
                            id="subtaskDescription"
                            autoComplete="off"
                            value={subtaskCurrentState && subtaskCurrentState.description ? subtaskCurrentState.description : ''}
                            onChange={(e) => setSubtaskCurrentState({...subtaskCurrentState, description:e.target.value})}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                    {subtaskCurrentState && subtaskCurrentState._id && subtaskCurrentState._id.length>5 ?
                        <button className="btn btnAdd" type="button" onClick={subtaskUpd}>Сохранить изменения</button>
                        :
                        <button className="btn btnAdd" type="button" onClick={subtaskAdd}>Добавить подзадачу</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default SubtaskModal;