import React,{useState,useEffect} from 'react';
import './file.css';
import {downloadFile} from "../../api";
import {deleteFile} from "../../actions/fileActions";
import {useDispatch,useSelector} from 'react-redux';

const File = ({file}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------*/
    const delFile = (file) => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0){
            dispatch(deleteFile(taskCurrentState._id,file.fileNameUuid));
            //console.log(file.fileNameUuid);
        }
    };
    /*--------------------------------------------------------------------------*/
    const dowFile = (e,file) => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0) {
            e.stopPropagation();
            downloadFile(taskCurrentState._id, file.fileNameUuid, file);
        }
    };
    /*--------------------------------------------------------------------------*/
    return (
        <>
        <div className="file">
            <div className="file__body">
                {file.fileName ? <span>{file.fileName}</span> : ''}
            </div>
            <div className="file__btns">
                <button className="btn btnDownload iconDownload" type="button" onClick={(e) => dowFile(e,file)}>&#8681;</button>
                <button className="btn btnDel iconDel" type="button" onClick={() => delFile(file)}>&#10007;</button>
            </div>
        </div>
        </>
    );
};

export default File;