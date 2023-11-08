import React,{useState,useEffect,useMemo} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createFile,fetchFiles} from "../../actions/fileActions";
import File from '../file/file';
import {useRef} from 'react';
import FileDelConfirmModal from './fileDelConfirmModal';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {buttonTheme} from '../../css/button';
import UploadIcon from '@mui/icons-material/Upload';


const FileListModal = ({show}) => {
    const dispatch = useDispatch();
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const fileDelConfirmModalVisible = useSelector((state)=>state.fileReducer.fileDelConfirmModalVisible);
    const websiteVisible = useSelector((state)=>state.websiteReducer.websiteVisible);
    const websiteVisibility = () => {
        if (document.hidden) {
            dispatch({type: 'WEBSITE_VISIBLE', payload: false});
        } else {
            dispatch({type: 'WEBSITE_VISIBLE', payload: true});
        }
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'FILE_LIST_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    const fileFetchAll = useSelector((state)=>state.fileReducer.files);
    const [filesLoading, setFilesLoading] = useState(false);

    useEffect(()=>{
        if(
            websiteVisible &&
            taskCurrent && taskCurrent._id && taskCurrent._id.length>0 &&
            !filesLoading
        ) {
            setFilesLoading(true);
            dispatch(fetchFiles(taskCurrent._id)).finally(() => setFilesLoading(false));
            //console.log("=f-list=1");
        }
    },[fileFetchAll]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                websiteVisible &&
                taskCurrent && taskCurrent._id && taskCurrent._id.length>0 &&
                !filesLoading
            ){
                dispatch(fetchFiles(taskCurrent._id));
                //console.log("=f-list=2");
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    const [file,setFile] = useState(null);
    const fileRef = useRef(null);
    const uploadFile = () => {
        if(taskCurrent && taskCurrent._id && taskCurrent._id.length) {
            const formData = new FormData();
            formData.append('taskId', taskCurrent._id);
            formData.append('file', file);
            dispatch(createFile(formData));
            fileRef.current.value = null;
            setFile(null);
        }
    };

    useEffect(()=>{
        if(file && file !== null){
            uploadFile();
        }
    },[file,fileRef]);
    /*--------------------------------------------------------------------------------*/
    useEffect(() => {
        document.addEventListener('visibilitychange',websiteVisibility, false );
        return () => {
            document.removeEventListener('visibilitychange',websiteVisibility, false );
        };
    },[]);
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    Прикреплённые файлы
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <div style={{height:'300px',border:'1px solid gray', overflowY:'auto'}}>
                            {
                                fileFetchAll &&
                                fileFetchAll.length > 0 &&
                                fileFetchAll.map((file, file_index) =>
                                    <File key={file_index} file={file}/>
                                )
                            }
                        </div>
                        <ThemeProvider theme={buttonTheme}>
                            <Button component="label" variant="contained" startIcon={<UploadIcon />}>
                              Загрузить файл
                                <input
                                    hidden
                                    type="file"
                                    ref={fileRef}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Button>
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CloseIcon/>}
                        onClick={modalClose}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
            {fileDelConfirmModalVisible ? <FileDelConfirmModal show={fileDelConfirmModalVisible}/>  : ''}
        </div>
    )
};

export default FileListModal;