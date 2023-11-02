import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import {createFile,fetchFiles} from "../../actions/fileActions";
import File from '../file/file';
import {useRef} from 'react';

const FileListModal = ({show}) => {
    const dispatch = useDispatch();
    let fileListModalVisibleSelector = useSelector((state)=>state.fileReducer.fileListModalVisible);
    /*--------------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        fileListModalVisibleSelector = false; //это или убирать/обнулить  -=currentTaskId=-
        setFiles({});
        setFile({});
        dispatch({type:'FILE_LIST_MODAL_VISIBLE', payload: false});
    };
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            modalClose();
        }
    });
    /*--------------------------------------------------------------------------------*/
    const fileFetchAll = useSelector((state)=>state.fileReducer.files);
    const [files, setFiles] = useState(fileFetchAll);
    const [filesLoading, setFilesLoading] = useState(false);
    useEffect(()=>{
        if(fileListModalVisibleSelector) {
            setFiles(fileFetchAll);
        }
    },[fileFetchAll]);

    useEffect(()=>{
        if(
            taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0 &&
            !filesLoading && fileListModalVisibleSelector
        ) {
            setFilesLoading(true);
            dispatch(fetchFiles(taskCurrentState._id)).finally(() => setFilesLoading(false));
        }
    },[fileFetchAll]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0 &&
                fileListModalVisibleSelector
            ){
                dispatch(fetchFiles(taskCurrentState._id));
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    const [file,setFile] = useState(null);
    const fileRef = useRef(null);
    const uploadFile = () => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length) {
            const formData = new FormData();
            formData.append('taskId', taskCurrentState._id);
            formData.append('file', file);
            dispatch(createFile(formData));
            fileRef.current.value = null;
        }
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
                            {taskCurrentState ? taskCurrentState.title : ''}
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

export default FileListModal;