import React,{useState,useEffect} from 'react';
import {deleteSubtask} from "../../api";
import './file.css';
import {deleteComment, createComment, fetchComments, deleteFile,fetchFile,fetchFile0,fetchFile1} from "../../api/index";
import moment from 'moment';
import axios from 'axios';
import {Link} from 'react-router-dom';


const File = ({file}) => {
    let currentTaskId = localStorage.getItem('taskCurrentId');
    /*--------------------------------------------------------------------------*/
    const delFile = (file) => {
        deleteFile(currentTaskId,file.fileNameUuid);
        //console.log(file.fileNameUuid);
    };
    /*--------------------------------------------------------------------------*/
        const downloadFile = (e,file) => {
        e.stopPropagation();
        fetchFile(currentTaskId,file.fileNameUuid,file);
    };
    /*--------------------------------------------------------------------------*/
    return (
        <>
        <div className="file">
            <div className="file__body">
                {file.fileName ? <span>{file.fileName}</span> : ''}
            </div>
            <div className="file__btns">
                <button className="btn btnDownload iconDownload" type="button" onClick={(e) => downloadFile(e,file)}>&#8681;</button>
                <button className="btn btnDel iconDel" type="button" onClick={() => delFile(file)}>&#10007;</button>
            </div>
        </div>
        </>
    );
};

export default File;