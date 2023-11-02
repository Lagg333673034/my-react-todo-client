import React,{useState} from 'react';
//import {deleteSubtask,updateSubtask} from "../../api";
import {deleteSubtask,updateSubtask} from "../../actions/subtaskActions";
import {useDispatch,useSelector} from 'react-redux';
import './subtask.css';

const Subtask = ({subtask}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    const updSubtask = (subtask) => {
        dispatch({type:'SUBTASK_CURRENT', payload: subtask});
        dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: true});
    };
    const doneSubtask = (subtask) => {
        dispatch(updateSubtask(subtask._id, {done: 'true'}));
    };
    const delSubtask = (subtask) => {
        dispatch(deleteSubtask(subtask._id));
    };
    /*--------------------------------------------------------------------------*/
    return (
        <div className="subtask" style={subtask.done && subtask.done !== '' ? {background: 'gray'} : {}}>
            <div style={subtask.done && subtask.done !== '' ? {textDecoration:'line-through'} : {}}>
                {subtask.description ? <span style={{width: '100%',}}>{subtask.description}</span> : ''}
            </div>
            <div className="subtask__btns">
                <button className="btn btnUpd" type="button" onClick={() => updSubtask(subtask)}>upd</button>
                {
                    !(subtask.done && subtask.done !== '') ?
                    <button className="btn btnUpd" type="button" onClick={() => doneSubtask(subtask)}>done</button>
                    :
                    ""
                }
                <button className="btn btnDel iconDel" type="button" onClick={() => delSubtask(subtask)}>&#10007;</button>
            </div>
        </div>
    );
};

export default Subtask;