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
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/inputs';


const ProjectModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const [projectData,setProjectData] = useState(useSelector((state)=>state.projectReducer.projectCurrent));
    /*--------------------------------------------------------------------------------*/
    const projectAdd = (e) => {
        dispatch(createProject(projectData));
        modalClose();
    };
    const projectUpd = (e) => {
        if(projectData && projectData._id) {
            dispatch(updateProject(projectData._id, projectData));
        }
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:"PROJECT_CURRENT",payload:null});
        dispatch({type:'PROJECT_MODAL_VISIBLE',payload:false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    {
                        projectData &&
                        projectData._id &&
                        projectData._id.length>5 ?
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
                                size="small"
                                autoComplete="off"
                                value={projectData && projectData.title ? projectData.title : ''}
                                onChange={(e) => setProjectData({...projectData, title:e.target.value})}
                            />
                            <TextField
                                label="Описание проекта"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={4}
                                autoComplete="off"
                                value={projectData && projectData.description ? projectData.description : ''}
                                onChange={(e) => setProjectData({...projectData, description:e.target.value})}
                            />
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            {projectData && projectData._id && projectData._id.length>5 ?
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