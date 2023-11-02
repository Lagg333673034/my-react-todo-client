import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {fetchProjects} from "../actions/projectActions";
import './PageProjects.css';
import ProjectModal from '../components/modal/projectModal';
import Project from '../components/project/project';
import Loader from '../components/loader/loader';

import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
    const modalVisible = useSelector((state)=>state.projectReducer.projectModalVisible);
    const [projectModalVisible, setProjectModalVisible] = useState(modalVisible);
    useEffect(()=>{
        setProjectModalVisible(modalVisible);
    },[modalVisible]);
    /*--------------------------------------------------------------------------------*/
    const projectFetchAll = useSelector((state)=>state.projectReducer.projects);
    const [projects, setProjects] = useState(projectFetchAll);
    const [projectsLoading, setProjectsLoading] = useState(false);
    useEffect(()=>{
        setProjects(projectFetchAll);
    },[projectFetchAll]);

    useEffect(()=>{
        if(!projectModalVisible && !projectsLoading) {
            setProjectsLoading(true);
            dispatch(fetchProjects()).finally(() => setProjectsLoading(false));
        }
    },[projectModalVisible]);
    useEffect(()=>{
        const timer = setTimeout(() => {
            dispatch(fetchProjects());
        }, 5000);
        return () => clearTimeout(timer);
    });
    /*--------------------------------------------------------------------------------*/
    return(
        <div>
            <Grid
                container direction="row" justifyContent="flex-start" alignItems="center"
                spacing={2}
                sx={{padding:'5px 5px 5px 5px'}}
            >
                <Grid item xs="auto">
                    <ThemeProvider theme={buttonTheme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AddBoxIcon/>}
                        onClick={() => dispatch({type:'PROJECT_MODAL_VISIBLE', payload: true})}

                    >
                        Добавить проект
                    </Button>
                    </ThemeProvider>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="input-with-icon-textfield"
                        hiddenLabel
                        placeholder="поиск ..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={(e) => setSearchProjectsStringTemp(e.target.value)}
                        sx={{width:'100%'}}
                    />
                </Grid>
            </Grid>
            <div className="title">
                Проекты
                {projectsLoading ? <div><Loader/></div> : <div style={{visibility: 'hidden'}}><Loader/></div>}
            </div>
            <Grid
                container direction="column" justifyContent="center" alignItems="stretch"
                spacing={0}
                sx={{padding:'0 5px 0 5px'}}
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
        </div>
    )
};

export default PageProjects;
