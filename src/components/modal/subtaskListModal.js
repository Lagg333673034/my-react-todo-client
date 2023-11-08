import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchSubtasks} from "../../actions/subtaskActions";
import Subtask from "../subtask/subtask";
import SubtaskModal from "./subtaskModal";
import SubtaskDelConfirmModal from './subtaskDelConfirmModal';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {buttonTheme} from '../../css/button';
import AddBoxIcon from '@mui/icons-material/AddBox';


const SubtaskListModal = ({show}) => {
    const dispatch = useDispatch();
    const websiteVisible = useSelector((state)=>state.websiteReducer.websiteVisible);
    const websiteVisibility = () => {
        if (document.hidden) {
            dispatch({type: 'WEBSITE_VISIBLE', payload: false});
        } else {
            dispatch({type: 'WEBSITE_VISIBLE', payload: true});
        }
    };
    /*--------------------------------------------------------------------------------*/
    const subtaskModalVisible = useSelector((state)=>state.subtaskReducer.subtaskModalVisible);
    const subtaskDelConfirmModalVisible = useSelector((state)=>state.subtaskReducer.subtaskDelConfirmModalVisible);
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const subtaskFetchAll = useSelector((state)=>state.subtaskReducer.subtasks);
    /*--------------------------------------------------------------------------------*/
    const [subtasksLoading, setSubtasksLoading] = useState(false);
    useEffect(()=>{
        if(
            websiteVisible &&
            taskCurrent && taskCurrent._id && taskCurrent._id.length>0 &&
            !subtaskModalVisible &&
            !subtasksLoading
        ) {
            setSubtasksLoading(true);
            dispatch(fetchSubtasks(taskCurrent._id)).finally(() => setSubtasksLoading(false));
            //console.log("=st-list=1");
        }
    },[subtaskFetchAll]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            if(
                websiteVisible &&
                taskCurrent && taskCurrent._id && taskCurrent._id.length>0 &&
                !subtaskModalVisible &&
                !subtasksLoading
            ){
                dispatch(fetchSubtasks(taskCurrent._id));
                //console.log("=st-list=2");
            }
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'SUBTASK_FETCH_ALL', payload: []});
        dispatch({type:'SUBTASK_LIST_MODAL_VISIBLE', payload: false});
    };
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
                    Список подзадач
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained" color="primary" size="small"
                                startIcon={<AddBoxIcon/>}
                                onClick={() => dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: true})}
                            >
                                Добавить подзадачу
                            </Button>
                        </ThemeProvider>
                        <div style={{height:'300px',margin:'10px 0px 0px 0px',border:'1px solid gray',overflowY:'auto'}}>
                            {
                                subtaskFetchAll &&
                                subtaskFetchAll.length > 0 &&
                                subtaskFetchAll.map((subtask, subtask_index) =>
                                    <Subtask
                                        key={subtask_index}
                                        subtask={subtask}
                                    />
                                )
                            }
                        </div>
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
            {subtaskModalVisible ? <SubtaskModal show={subtaskModalVisible}/>  : ''}
            {subtaskDelConfirmModalVisible ? <SubtaskDelConfirmModal show={subtaskDelConfirmModalVisible}/>  : ''}
        </div>
    )
};

export default SubtaskListModal;