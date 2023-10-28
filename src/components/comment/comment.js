import React,{useState,useEffect} from 'react';
import {deleteSubtask} from "../../api";
import './comment.css';
import {deleteComment,createComment,fetchComments} from "../../api/index";
import moment from 'moment';

const Comment = ({comment,lvl}) => {
    let temp_lvl = Number(lvl)*20 + 5;
    if(temp_lvl > 100){
        temp_lvl=100;
    }
    /*--------------------------------------------------------------------------*/
    const addSubComment = (comment) => {
        localStorage.setItem('selectedCommenId',comment._id);
    };
    const delComment = (comment) => {
        deleteComment(comment._id);
    };
    /*--------------------------------------------------------------------------*/
    return (
        <>
        <div className="comment" style={{marginLeft: `${temp_lvl}px`}}>
            <div className="comment__body">
                <div style={{width: '100%',}}>
                    <span>{comment.username} </span>
                    <span>({moment(Number(comment.dateCreate)).format("DD.MM.YYYY -- HH:mm:ss")})</span>
                    <br/>
                </div>
                <div style={{width: '100%',}}>
                    {comment.message ? <span>Сообщение: {comment.message}</span> : ''}<br/>
                </div>
            </div>
            <div className="comment__btns">
                <button className="btn btnSelect" type="button" onClick={() => addSubComment(comment)}>Комм.</button>
                <button className="btn btnDel iconDel" type="button" onClick={() => delComment(comment)}>&#10007;</button>
            </div>
        </div>
        </>
    );
};

export default Comment;