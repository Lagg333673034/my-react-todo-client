import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {fetchProjects} from "../actions/projectActions";
import './PageProjects.css';
import ProjectModal from '../components/modal/projectModal';
import ProjectDelConfirmModal from '../components/modal/projectDelConfirmModal';
import Project from '../components/project/project';
import Loader from '../components/loader/loader';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonTheme} from '../css/buttons';

const PageProjects = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:"PROJECT_CURRENT",payload:null});
        dispatch({type:"TASK_CURRENT",payload:null});
        dispatch({type:'TASK_FETCH_ALL', payload: []});
    },[]);
    /*--------------------------------------------------------------------------------*/
    const [searchProjectsString,setSearchProjectsString] = useState('');
    const [searchProjectsStringTemp, setSearchProjectsStringTemp] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchProjectsString(searchProjectsStringTemp)
        }, 500);
        return () => clearTimeout(timer)
    }, [searchProjectsStringTemp]);
    /*--------------------------------------------------------------------------------*/
    const projectModalVisible = useSelector((state)=>state.projectReducer.projectModalVisible);
    const projectDelConfirmModalVisible = useSelector((state)=>state.projectReducer.projectDelConfirmModalVisible);
    const projectFetchAll = useSelector((state)=>state.projectReducer.projects);
    /*--------------------------------------------------------------------------------*/
    const [projects, setProjects] = useState(projectFetchAll);
    const [projectsLoading, setProjectsLoading] = useState(false);
    useEffect(()=>{
        if(!projectsLoading)
            setProjects(projectFetchAll);
    },[projectFetchAll,projectsLoading]);

    useEffect(()=>{
        if(
            !projectModalVisible && !projectDelConfirmModalVisible &&
            !projectsLoading
        ) {
            setProjectsLoading(true);
            dispatch(fetchProjects()).finally(() => setProjectsLoading(false));
        }
    },[projectModalVisible,projectDelConfirmModalVisible]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            dispatch(fetchProjects());
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 27) {
            dispatch({type:"PROJECT_CURRENT", payload:null});
            dispatch({type:'PROJECT_MODAL_VISIBLE', payload:false});
            dispatch({type:'PROJECT_DEL_CONFIRM_MODAL_VISIBLE', payload:false});
        }
    });
    /*--------------------------------------------------------------------------------*/
    return(
        <div>
            <Grid
                container direction="row" justifyContent="flex-start" alignItems="center"
                spacing={2} sx={{padding:'5px 5px 5px 5px'}}
            >
                <Grid item xs="auto">
                    <ThemeProvider theme={buttonTheme}>
                        <Button
                            variant="contained" color="primary" size="small"
                            startIcon={<AddBoxIcon/>}
                            onClick={() => dispatch({type:'PROJECT_MODAL_VISIBLE', payload: true})}
                        >
                            Добавить проект
                        </Button>
                    </ThemeProvider>
                </Grid>
                <Grid item xs>
                    <TextField
                        hiddenLabel placeholder="поиск ..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard" sx={{width:'100%'}}
                        onChange={(e) => setSearchProjectsStringTemp(e.target.value)}
                    />
                </Grid>
            </Grid>
            <div className="titleProject">
                Проекты
                {projectsLoading ? <div><Loader/></div> : <div style={{visibility: 'hidden'}}><Loader/></div>}
            </div>
            <Grid
                container direction="column" justifyContent="center" alignItems="stretch"
                spacing={0} sx={{padding:'0 5px 0 5px'}}
            >
            {
                projects &&
                projects.length > 0 &&
                projects
                    .filter(project =>
                        (project.title && project.title.toLowerCase().includes(searchProjectsString.toLowerCase())) ||
                        (project.description && project.description.toLowerCase().includes(searchProjectsString.toLowerCase()))
                    )
                    .map((project, project_index) =>{
                        return (
                            <Grid
                                key={project_index}
                                item xs={12}
                                sx={{margin:'5px'}}
                            >
                                <Project project={project}/>
                            </Grid>
                        )
                    })
            }
            </Grid>
            {projectModalVisible ? <ProjectModal show={projectModalVisible}/>  : ''}
            {projectDelConfirmModalVisible ? <ProjectDelConfirmModal show={projectDelConfirmModalVisible}/>  : ''}
        </div>
    )
};

export default PageProjects;
