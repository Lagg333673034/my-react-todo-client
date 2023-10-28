import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch} from 'react-redux';
import {fetchTask} from "../../api";
import {useParams} from "react-router-dom";
import {createFile, fetchFiles} from "../../api/index";
import File from '../file/file';
import {useRef} from 'react';

const FileModal = ({show}) => {
    const dispatch = useDispatch();
    const [taskData,setTaskData] = useState({});
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = useParams().id;
    const currentTaskId = localStorage.getItem('taskCurrentId');
    useEffect(()=>{
        if(
            currentProjectId && currentProjectId.length>5 &&
            currentTaskId && currentTaskId.length>5
        ) {
            fetchTask(currentProjectId,currentTaskId).then(response => setTaskData(response.data[0]));
        }
    },[currentProjectId,currentTaskId]);
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setTaskData({});
        localStorage.removeItem('taskCurrentId');
        dispatch({type:'FILE_MODAL_VISIBLE', payload: false});
    };
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            modalClose();
        }
    });
    /*--------------------------------------------------------------------------------*/
    const [files,setFiles] = useState(null);
    const [file,setFile] = useState(null);
    const fileRef = useRef(null);

    useEffect(()=>{
        if(currentTaskId && currentTaskId.length && currentTaskId.length>5) {
            fetchFiles(currentTaskId)
                .then(response => setFiles(response.data));
        }
    },[]);
    useEffect(()=>{
        let timerId = setInterval(() => {
            if(currentTaskId && currentTaskId.length && currentTaskId.length>5) {
                fetchFiles(currentTaskId)
                    .then(response => setFiles(response.data))
                    .catch(error => console.log(error));
            }
        }, 2000);
        return ()=>{
            clearInterval(timerId);
        }
    },[]);
    /*--------------------------------------------------------------------------------*/
    const uploadFile = () => {
        const formData = new FormData();
        formData.append('taskId', currentTaskId);
        formData.append('file', file);
        createFile(formData);
        fileRef.current.value = null;
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">

                </div>
                <div className="modal-content">
                    <div style={{width:'100%'}}>
                        <div className="title">
                            Файлы к задаче<br/>
                            {taskData.title}
                        </div>
                        <div style={{height:'300px',border:'1px solid gray', overflowY:'auto'}}>
                            {
                                files &&
                                files.length > 0 &&
                                files.map((file, file_index) =>
                                    <File key={file_index} file={file}/>
                                )
                            }
                        </div>
                        <div>
                            <input
                                type="file"
                                ref={fileRef}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button onClick={uploadFile}>Загрузить файл</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                </div>
            </div>
        </div>
    )
};

export default FileModal;