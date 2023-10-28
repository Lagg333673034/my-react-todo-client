import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {fetchProjects} from "../api";
import './PageProjects.css';
import ProjectModal from '../components/modal/projectModal';
import Project from '../components/project/project';
import Loader from '../components/loader/loader';

const PageProjects = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        localStorage.removeItem('projectCurrentId');
    },[]);
    /*--------------------------------------------------------------------------------*/
    const [searchProjectsString,setSearchProjectsString] = useState('');
    /*--------------------------------------------------------------------------------*/
    const [searchTemp, setSearchTemp] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchProjectsString(searchTemp)
        }, 500);
        return () => clearTimeout(timer)
    }, [searchTemp]);
    /*--------------------------------------------------------------------------------*/
    const modalVisible = useSelector((state)=>state.projectReducer.projectModalVisible);
    const [projectModalVisible, setProjectModalVisible] = useState(modalVisible);
    useEffect(()=>{
        setProjectModalVisible(modalVisible);
    },[modalVisible]);
    /*--------------------------------------------------------------------------------*/
    const [projects, setProjectsData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(!projectModalVisible) {
            setLoading(true);
            fetchProjects()
                .then(response => setProjectsData(response.data))
                .finally(() => setLoading(false));
        }
    },[projectModalVisible,searchProjectsString]);
    useEffect(()=>{
        if(!loading && !projectModalVisible) {
            let timerId = setInterval(() => {
                fetchProjects()
                    .then(response => setProjectsData(response.data));
            }, 2000);
            return ()=>{
                clearInterval(timerId);
            }
        }
    },[loading,projectModalVisible,searchProjectsString]);
    /*--------------------------------------------------------------------------------*/
    return(
        <div>
            <div className="tools">
                <button
                    className="btn btnAdd"
                    type="button"
                    onClick={() => dispatch({type:'PROJECT_MODAL_VISIBLE', payload: true})}
                >
                    Добавить проект
                </button>
                <input type="text" onChange={(e) => setSearchTemp(e.target.value)} placeholder="поиск ..." />
            </div>
            <div className="title">
                Проекты
                {loading ? <div><Loader/></div> : <div style={{visibility: 'hidden'}}><Loader/></div>}
            </div>
            <div>
                {
                    projects &&
                    projects.length > 0 &&
                    projects
                        .filter(project =>
                            (project.title && project.title.toLowerCase().includes(searchProjectsString.toLowerCase())) ||
                            (project.description && project.description.toLowerCase().includes(searchProjectsString.toLowerCase()))
                        )
                        .map((project, project_index) =>
                            <Project
                                key={project_index}
                                project={project}
                            />
                        )
                }
            </div>
            {projectModalVisible ? <ProjectModal show={projectModalVisible}/>  : ''}
        </div>
    )
};

export default PageProjects;
