const defaultState = {
    tasksLoading: false,
    tasks: [],
    taskCurrent: null,
    taskModalVisible: false,
    taskDelConfirmModalVisible: false,
    taskSettingsMenuOpen: false,
};

export const taskReducer = (state = defaultState, action) => {
    switch(action.type){
        case "TASKS_LOADING":
            return {...state, tasksLoading: action.payload};
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
        case "TASK_DEL_CONFIRM_MODAL_VISIBLE":
            return {...state, taskDelConfirmModalVisible: action.payload};
        case "TASK_SETTINGS_MENU_OPEN":
            return {...state, taskSettingsMenuOpen: action.payload};

        default:
            return state;
    }
};