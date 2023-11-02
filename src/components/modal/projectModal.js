import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchProject,createProject,updateProject} from "../../actions/projectActions";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
//import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/inputs';



const ProjectModal = ({show}) => {
    /*--------------------------------------------------------------------------------*/
    const dispatch = useDispatch();
    const [projectData,setProjectData] = useState({title:'',description:''});
    /*--------------------------------------------------------------------------------*/
    const projectCurrent = useSelector((state)=>state.projectReducer.projectCurrent);
    const [projectCurrentState, setProjectCurrentState] = useState(projectCurrent);
    useEffect(()=>{
        setProjectCurrentState(projectCurrent);
        setProjectData(projectCurrent);
    },[projectCurrent]);
    /*--------------------------------------------------------------------------------*/
    const projectAdd = (e) => {
        dispatch(createProject(projectData));
        modalClose();
    };
    const projectUpd = (e) => {
        if(projectCurrentState && projectCurrentState._id) {
            dispatch(updateProject(projectCurrentState._id, projectData));
        }
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setProjectData({title:'',description:''});
        dispatch({type:"PROJECT_CURRENT",payload:null});
        dispatch({type:'PROJECT_MODAL_VISIBLE',payload:false});
    };
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            modalClose();
        }
    });
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    {
                        projectCurrentState &&
                        projectCurrentState._id &&
                        projectCurrentState._id.length>5 ?
                            'Редактировать проект'
                            :
                            'Добавить проект'
                    }
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={inputTheme}>
                        <TextField
                            label="Название проекта"
                            variant="outlined"
                            value={projectData && projectData.title ? projectData.title : ''}
                            autoComplete="off"
                            onChange={(e) => setProjectData({...projectData, title:e.target.value})}
                        />
                        <TextField
                            label="Описание проекта"
                            ariant="outlined"
                            multiline
                            rows={4}
                            value={projectData && projectData.description ? projectData.description : ''}
                            autoComplete="off"
                            onChange={(e) => setProjectData({...projectData, description:e.target.value})}
                        />
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid
                        container direction="row" justifyContent="center" alignItems="center"
                    >
                        <Grid item xs="auto">
                            {projectCurrentState && projectCurrentState._id && projectCurrentState._id.length>5 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon/>}
                                    onClick={projectUpd}
                                >
                                    Сохранить изменения
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon/>}
                                    onClick={projectAdd}
                                >
                                    Добавить проект
                                </Button>
                            }
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<CloseIcon/>}
                                onClick={modalClose}
                            >
                                Закрыть
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default ProjectModal;