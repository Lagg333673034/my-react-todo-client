const defaultState = {
    subtasks: [],
    subtaskCurrent: null,
    subtaskListModalVisible: false,
    subtaskModalVisible: false,
    subtaskDelConfirmModalVisible: false,
};

export const subtaskReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SUBTASK_FETCH_ALL":
            return {...state, subtasks: action.payload};
        case "SUBTASK_CREATE":
            return {...state, subtasks: [...state.subtasks, action.payload]};
        case "SUBTASK_UPDATE":
            return {
                ...state,
                subtasks: state.subtasks.map((subtask) => subtask._id === action.payload._id ? action.payload : subtask)
            };
        case "SUBTASK_DELETE":
            return {
                ...state,
                subtasks: state.subtasks.filter((subtask) => subtask._id !== action.payload)
            };

        case "SUBTASK_CURRENT":
            return {...state, subtaskCurrent: action.payload};

        case "SUBTASK_LIST_MODAL_VISIBLE":
            return {...state, subtaskListModalVisible: action.payload};
        case "SUBTASK_MODAL_VISIBLE":
            return {...state, subtaskModalVisible: action.payload};
        case "SUBTASK_DEL_CONFIRM_MODAL_VISIBLE":
            return {...state, subtaskDelConfirmModalVisible: action.payload};


        default:
            return state;
    }
};
