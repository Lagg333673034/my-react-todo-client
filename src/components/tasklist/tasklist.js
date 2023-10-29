import React from 'react';
import './tasklist.css';
import Task from "../task/task";
import {Droppable} from 'react-beautiful-dnd';

const Tasklist = ({column,tasks,searchTasksString}) => {
    /*--------------------------------------------------------------------------*/
    /*--------------------------------------------------------------------------*/
    return (
        <Droppable droppableId={column.status}>
            {(provided)=>(
                <div
                    className="condition"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div className="condition__title">{column.title}</div>
                    {
                        tasks && tasks.length > 0 && tasks
                            .filter(task =>
                                (task.number && task.number.toLowerCase().includes(searchTasksString.toLowerCase())) ||
                                (task.title && task.title.toLowerCase().includes(searchTasksString.toLowerCase())) ||
                                (task.description && task.description.toLowerCase().includes(searchTasksString.toLowerCase()))
                            )
                            .sort((a, b) => b.priority.localeCompare(a.priority))
                            .map((task,task_index) =>
                                <Task key={task._id} index={task_index} task={task}/>
                            )
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Tasklist;