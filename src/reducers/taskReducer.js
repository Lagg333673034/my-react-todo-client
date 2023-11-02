const defaultState = {
    tasks: [],
    taskCurrent: null,
    taskModalVisible: false,
    //taskNeedRefresh: false
};

export const taskReducer = (state = defaultState, action) => {
    switch(action.type){
        case "TASK_FETCH_ALL":
            return {...state, tasks: action.payload};
        case "TASK_CREATE":
            return {...state, tasks: [...state.tasks, action.payload]};
        case "TASK_UPDATE":
            return {
                ...state,
                tasks: state.tasks.map((task) => task._id === action.payload._id ? action.payload : task)
            };
        case "TASK_DELETE":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload)
            };

        case "TASK_CURRENT":
            return {...state, taskCurrent: action.payload};
        case "TASK_MODAL_VISIBLE":
            return {...state, taskModalVisible: action.payload};
        /*case "TASK_NEED_REFRESH":
            return {...state, taskNeedRefresh: action.payload};*/

        default:
            return state;
    }
};