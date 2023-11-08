const defaultState = {
    projects: [],
    projectCurrent: null,
    projectModalVisible: false,
    projectDelConfirmModalVisible: false,
    projectSettingsMenuOpen: false,
};

export const projectReducer = (state = defaultState, action) => {
    switch(action.type){
        case "PROJECT_FETCH_ALL":
            return {...state, projects: action.payload};
        case "PROJECT_CREATE":
            return {...state, projects: [...state.projects, action.payload]};
        case "PROJECT_UPDATE":
            return {
                ...state,
                projects: state.projects.map((project) => project._id === action.payload._id ? action.payload : project)
            };
        case "PROJECT_DELETE":
            return {
                ...state,
                projects: state.projects.filter((project) => project._id !== action.payload)
            };

        case "PROJECT_CURRENT":
            return {...state, projectCurrent: action.payload};
        case "PROJECT_MODAL_VISIBLE":
            return {...state, projectModalVisible: action.payload};
        case "PROJECT_DEL_CONFIRM_MODAL_VISIBLE":
            return {...state, projectDelConfirmModalVisible: action.payload};
        case "PROJECT_SETTINGS_MENU_OPEN":
            return {...state, projectSettingsMenuOpen: action.payload};


        default:
            return state;
    }
};