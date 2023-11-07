import axios from 'axios';

let host = "http://localhost:5000/api";
//let host = "https://todo-server-rijd.onrender.com/api";

const urlProject = `${host}/project`;
const urlTask = `${host}/task`;
const urlSubtask = `${host}/subtask`;
const urlComment = `${host}/comment`;
const urlFile = `${host}/file`;

export const createProject = async (newProject) => axios.post(urlProject,newProject);
export const updateProject = async (id,updatedProject) => axios.patch(`${urlProject}/${id}`,updatedProject);
export const deleteProject = async (id) => axios.delete(`${urlProject}/${id}`);
export const fetchProjects = async () => axios.get(urlProject);
export const fetchProject = async (projectId) => axios.get(`${urlProject}/${projectId}`);

export const createTask = async (projectId,newTask) => axios.post(urlTask,{projectId, newTask});
export const updateTask = async (id,updatedTask) => axios.patch(`${urlTask}/${id}`,updatedTask);
export const deleteTask = async (id) => axios.delete(`${urlTask}/${id}`);
export const fetchTasks = async (projectId) => axios.get(`${urlTask}/${projectId}`);
export const fetchTask = async (projectId,taskId) => axios.get(`${urlTask}/${projectId}/${taskId}`);

export const createSubtask = async (taskId,newSubtask) => axios.post(urlSubtask,{taskId, newSubtask});
export const updateSubtask = async (id,updatedSubtask) => axios.patch(`${urlSubtask}/${id}`,updatedSubtask);
export const deleteSubtask = async (id) => axios.delete(`${urlSubtask}/${id}`);
export const fetchSubtasks = async (taskId) => axios.get(`${urlSubtask}/${taskId}`);
export const fetchSubtask = async (taskId,subtaskId) => axios.get(`${urlSubtask}/${taskId}/${subtaskId}`);

export const createComment = async (taskId,commentId,newComment) => axios.post(urlComment,{taskId,commentId,newComment});
export const updateComment = async (id,updatedComment) => axios.patch(`${urlComment}/${id}`,updatedComment);
export const deleteComment = async (id) => axios.delete(`${urlComment}/${id}`);
export const fetchComments = async (taskId,commentId) => axios.get(`${urlComment}/${taskId}/${commentId}`);
export const fetchComment = async (taskId,commentId,id) => axios.get(`${urlComment}/${taskId}/${commentId}/${id}`);

export const createFile = async (newFile) => axios.post(urlFile,newFile);
export const deleteFile = async (taskId,fileNameUuid) => axios.delete(`${urlFile}/${taskId}/${fileNameUuid}`);
export const fetchFiles = async (taskId) => axios.get(`${urlFile}/${taskId}`);
export const downloadFile = async (taskId,fileNameUuid,file) => {
    const responce = await fetch(`${urlFile}/${taskId}/${fileNameUuid}`);
    if (responce.status === 200) {
        const blob = await responce.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.fileName;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};

