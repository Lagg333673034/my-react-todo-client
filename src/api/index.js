import axios from 'axios';

let host = "http://localhost:5000/api";
//let host = "https://todo-server-rijd.onrender.com/api";


const urlAuth = `${host}/auth`;
const urlUser = `${host}/user`;
const urlProject = `${host}/project`;
const urlTask = `${host}/task`;
const urlSubtask = `${host}/subtask`;
const urlComment = `${host}/comment`;
const urlFile = `${host}/file`;


export let $api = axios.create({withCredentials: true, /*baseURL: host,*/ });

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.withCredentials = true;
    //config.credentials = 'include';
    return config;
});

$api.interceptors.response.use(
    (config) => {return config},
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 && error.config && !error.config._isRetry){
            originalRequest._isRetry = true;
            try{
                const response = await axios.get(`${urlAuth}/refresh`,{
                    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
            }catch(e){
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        throw error;
    }
);


export const login = async (email,password) => await axios.post(`${urlAuth}/login`,{email, password},{
    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});
export const registration = async (email,password) => await axios.post(`${urlAuth}/registration`,{email, password},{
    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});
export const logout = async () => await axios.post(`${urlAuth}/logout`,{},{
    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});
export const refresh = async () => await axios.get(`${urlAuth}/refresh`,{
    withCredentials: true, 
    credentials: 'include',
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
});
export const recoverPasswordEmail = async (email) => await axios.post(`${urlAuth}/recoverPasswordEmail`,{email},{
    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});
export const recoverPassword = async (randomUuid,password) => await axios.post(`${urlAuth}/recoverPassword`,{randomUuid,password},{
    withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
});

/*
export const login = async (email,password) => $api.post(`${urlAuth}/login`,{email, password});
export const registration = async (email,password) => $api.post(`${urlAuth}/registration`,{email, password});
export const logout = async () => $api.post(`${urlAuth}/logout`);
export const refresh = async () => $api.get(`${urlAuth}/refresh`);
export const recoverPasswordEmail = async (email) => $api.post(`${urlAuth}/recoverPasswordEmail`,{email});
export const recoverPassword = async (randomUuid,password) => $api.post(`${urlAuth}/recoverPassword`,{randomUuid,password});
*/

export const createUser = async (newUser) => $api.post(urlUser,newUser);
export const updateUser = async (id,updatedUser) => $api.patch(`${urlUser}/${id}`,updatedUser);
export const deleteUser = async (id) => $api.delete(`${urlUser}/${id}`);
export const fetchUsers = async () => $api.get(urlUser);
export const fetchUser = async (id) => $api.get(`${urlUser}/${id}`);

export const createProject = async (newProject) => $api.post(urlProject,newProject);
export const updateProject = async (id,updatedProject) => $api.patch(`${urlProject}/${id}`,updatedProject);
export const deleteProject = async (id) => $api.delete(`${urlProject}/${id}`);
export const fetchProjects = async () => $api.get(urlProject);
export const fetchProject = async (projectId) => $api.get(`${urlProject}/${projectId}`);

export const createTask = async (projectId,newTask) => $api.post(urlTask,{projectId, newTask});
export const updateTask = async (id,updatedTask) => $api.patch(`${urlTask}/${id}`,updatedTask);
export const deleteTask = async (id) => $api.delete(`${urlTask}/${id}`);
export const fetchTasks = async (projectId) => $api.get(`${urlTask}/${projectId}`);
export const fetchTask = async (projectId,taskId) => $api.get(`${urlTask}/${projectId}/${taskId}`);

export const createSubtask = async (taskId,newSubtask) => $api.post(urlSubtask,{taskId, newSubtask});
export const updateSubtask = async (id,updatedSubtask) => $api.patch(`${urlSubtask}/${id}`,updatedSubtask);
export const deleteSubtask = async (id) => $api.delete(`${urlSubtask}/${id}`);
export const fetchSubtasks = async (taskId) => $api.get(`${urlSubtask}/${taskId}`);
export const fetchSubtask = async (taskId,subtaskId) => $api.get(`${urlSubtask}/${taskId}/${subtaskId}`);

export const createComment = async (taskId,commentId,newComment) => $api.post(urlComment,{taskId,commentId,newComment});
export const updateComment = async (id,updatedComment) => $api.patch(`${urlComment}/${id}`,updatedComment);
export const deleteComment = async (id) => $api.delete(`${urlComment}/${id}`);
export const fetchComments = async (taskId,commentId) => $api.get(`${urlComment}/${taskId}/${commentId}`);
export const fetchComment = async (taskId,commentId,id) => $api.get(`${urlComment}/${taskId}/${commentId}/${id}`);

export const createFile = async (newFile) => $api.post(urlFile,newFile);
export const deleteFile = async (taskId,fileNameUuid) => $api.delete(`${urlFile}/${taskId}/${fileNameUuid}`);
export const fetchFiles = async (taskId) => $api.get(`${urlFile}/${taskId}`);
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

