import React from 'react';
import './file.css';
import {deleteFile,fetchFile} from "../../api/index";

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