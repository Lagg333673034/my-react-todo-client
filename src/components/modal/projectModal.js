import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch} from 'react-redux';
import {fetchProject,createProject,updateProject} from "../../api";

const ProjectModal = ({show}) => {
    /*--------------------------------------------------------------------------------*/
    const dispatch = useDispatch();
    const [projectData,setProjectData] = useState({title:'',description:''});
    /*--------------------------------------------------------------------------------*/
    const currentProjectId = localStorage.getItem('projectCurrentId');
    useEffect(()=>{
        if(currentProjectId && currentProjectId.length>5) {
            fetchProject(currentProjectId).then(response => setProjectData(response.data[0]));
        }
    },[currentProjectId]);
    /*--------------------------------------------------------------------------------*/
    const projectAdd = (e) => {
        e.preventDefault();
        createProject(projectData);
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const projectUpd = (e) => {
        e.preventDefault();
        updateProject(currentProjectId,projectData);
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        setProjectData({});
        localStorage.removeItem('projectCurrentId');
        dispatch({type:'PROJECT_MODAL_VISIBLE', payload: false});
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
                    {currentProjectId && currentProjectId.length>5 ? 'Редактировать проект' : 'Добавить проект'}
                </div>
                <div className="modal-content">
                    <div className="inputOut">
                        Название проекта
                        <input
                            className="inputIn"
                            type="text"
                            id="projectTitle"
                            value={projectData.title ? projectData.title : ''}
                            autoComplete="off"
                            onChange={(e) => setProjectData({...projectData, title:e.target.value})}
                        />
                    </div>
                    <div className="inputOut">
                        Описание проекта
                        <input
                            className="inputIn"
                            type="text"
                            id="projectDescription"
                            value={projectData.description ? projectData.description : ''}
                            autoComplete="off"
                            onChange={(e) => setProjectData({...projectData, description:e.target.value})}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btnClose" type="button" onClick={modalClose}>Закрыть</button>
                    {currentProjectId && currentProjectId.length>5 ?
                        <button className="btn btnAdd" type="button" onClick={projectUpd}>Сохранить изменения</button>
                        :
                        <button className="btn btnAdd" type="button" onClick={projectAdd}>Добавить проект</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProjectModal;