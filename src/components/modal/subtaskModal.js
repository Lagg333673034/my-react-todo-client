import React,{useState} from 'react';
import './modal.css';
import {useDispatch} from 'react-redux';
import {createSubtask} from "../../api";

const SubtaskModal = ({show}) => {
    const dispatch = useDispatch();
    const [subtaskData,setSubtaskData] = useState({});
    /*--------------------------------------------------------------------------------*/
    const currentTaskId = localStorage.getItem('taskCurrentId');
    /*--------------------------------------------------------------------------------*/
    const subtaskAdd = (e) => {
        e.preventDefault();
        createSubtask(
            currentTaskId,
            {
                description: String(subtaskData.description || ''),
                done: String(''),
            }
        );
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setSubtaskData({});
        dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: false});
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
                    Добавить подзадачу
                </div>
                <div className="modal-content">
                    <div className="inputOut">
                        Описание
                        <input
                            className="inputIn"
                            type="text"
                            id="subtaskDescription"
                            autoComplete="off"
                            value={subtaskData.description ? subtaskData.description : ''}
                            onChange={(e) => setSubtaskData({...subtaskData, description:e.target.value})}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                    <button className="btn btnAdd" type="button" onClick={subtaskAdd}>Добавить подзадачу</button>
                </div>
            </div>
        </div>
    )
};

export default SubtaskModal;