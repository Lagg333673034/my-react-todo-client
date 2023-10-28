import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteProject} from "../../api";
import './project.css';
import {useNavigate} from "react-router-dom";
import {TASKS_ROUTE} from "../../routes/consts";

const Project = ({project}) => {
    const dispatch = useDispatch();
    const router = useNavigate();
    /*----------------------------------------------------------------------------------*/
    const selectCurrentProject = () => {
        localStorage.setItem('projectCurrentId',project._id);
        router(`${TASKS_ROUTE}/${project._id}`);
    };
    /*----------------------------------------------------------------------------------*/
    const updCurrentProject = () => {
        localStorage.setItem('projectCurrentId',project._id);
        dispatch({type:'PROJECT_MODAL_VISIBLE', payload: true});
    };
    /*----------------------------------------------------------------------------------*/
    const delCurrentProject = (project) => {
        deleteProject(project._id);
    };
    /*----------------------------------------------------------------------------------*/
    return (
        <div className="project">
            <div style={{width:'100%'}}>
                <span style={{width:'100%',fontWeight:'700',color:'darkblue'}}>{project.title}</span><br/>
                {project.description ? <span style={{width:'100%',fontStyle:'italic'}}>({project.description})</span> : ''}
            </div>
            <div className="project__btns">
                <button className="btn btnSelect" type="button" onClick={selectCurrentProject}>Выбрать</button>
                <button className="btn btnUpd" type="button" onClick={updCurrentProject}>Редактировать</button>
                <button className="btn btnDel" type="button" onClick={() => delCurrentProject(project)}>Удалить</button>
            </div>
        </div>
    );
};

export default Project;
