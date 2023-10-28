import React from 'react';
import {deleteSubtask} from "../../api";
import './subtask.css';
import {updateSubtask} from "../../api/index";

const Subtask = ({subtask}) => {
    /*--------------------------------------------------------------------------*/
    const updSubtask = (subtask) => {
        updateSubtask(
            subtask._id,
            {
                done: String('true'),
            }
        );
    };
    const delSubtask = (subtask) => {
        deleteSubtask(subtask._id);
    };
    /*--------------------------------------------------------------------------*/
    return (
        <div className="subtask" style={subtask.done && subtask.done !== '' ? {background: 'gray'}:{}}>
            <div style={subtask.done && subtask.done !== '' ? {textDecoration:'line-through'} : {}}>
                {subtask.description ? <span style={{width: '100%',}}>{subtask.description}</span> : ''}
            </div>
            <div className="subtask__btns">
                {!(subtask.done && subtask.done !== '') ?
                    <button
                        className="btn btnUpd" type="button"
                        onClick={() => updSubtask(subtask)}
                    >
                        &#10004;
                    </button>
                    :
                    ""
                }
                <button
                    className="btn btnDel iconDel" type="button"
                    onClick={() => delSubtask(subtask)}
                >
                    &#10007;
                </button>
            </div>
        </div>
    );
};

export default Subtask;