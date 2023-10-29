import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteTask} from "../../api";
import './task.css';
import moment from 'moment';
import {Draggable} from 'react-beautiful-dnd';

const Task = ({index,task}) => {
    /*--------------------------------------------------------------------------*/
    const dispatch = useDispatch();
    const commentTask = (task) => {
        localStorage.setItem('taskCurrentId',task._id);
        dispatch({type:'COMMENT_MODAL_VISIBLE', payload: true});
    };
    const fileTask = (task) => {
        localStorage.setItem('taskCurrentId',task._id);
        dispatch({type:'FILE_MODAL_VISIBLE', payload: true});
    };
    const updTask = (task) => {
        localStorage.setItem('taskCurrentId',task._id);
        dispatch({type:'TASK_MODAL_VISIBLE', payload: true});
    };
    const delTask = (task) => {
        deleteTask(task._id);
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided,snapshot) => (
                <div
                    className={snapshot.isDragging ? "task taskIsDragging" : "task"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >
                    <div>
                        <span style={{width: '100%', color: 'green'}}>№ {task.number}</span><br/>
                        <span style={{
                            width: '100%',
                            fontWeight: '700',
                            color: 'darkblue'
                        }}>{task.title}</span><br/>
                        {task.description ? <span style={{
                            width: '100%',
                            fontStyle: 'italic'
                        }}>{task.description}</span> : ''}<br/>
                        {task.timeInWork ? <span style={{
                            width: '100%',
                            color: 'gray',
                            fontStyle: 'italic',
                            fontSize: '12px'
                        }}>
                                            <br/>в работе ({
                            moment.duration(Number(task.timeInWork)).days() + " дн., " +
                            moment.duration(Number(task.timeInWork)).hours() + " ч., " +
                            moment.duration(Number(task.timeInWork)).minutes() + " мин., " +
                            moment.duration(Number(task.timeInWork)).seconds() + " сек."
                        })</span> : ''}
                        {task.dateFinish ? <span style={{
                            width: '100%',
                            color: 'gray',
                            fontStyle: 'italic',
                            fontSize: '12px'
                        }}>
                    <br/>завершено ({moment(Number(task.dateFinish)).format("DD.MM.YYYY  HH:mm:ss")})</span> : ''}
                    </div>
                    <div className="task__btns">
                        <button className="btn btnUpd iconUpd" type="button" onClick={() => commentTask(task)}>&#x2709;</button>
                        <button className="btn btnUpd iconUpd" type="button" onClick={() => fileTask(task)}>&#128196;</button>
                        <button className="btn btnUpd iconUpd" type="button" onClick={() => updTask(task)}>&#9998;</button>
                        <button className="btn btnDel iconDel" type="button" onClick={() => delTask(task)}>&#10007;</button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;