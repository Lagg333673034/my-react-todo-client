const defaultState = {
    projects: [],
    projectCurrent: null,
    projectModalVisible: false,
    //projectNeedRefresh: false
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
        /*case "PROJECT_NEED_REFRESH":
            return {...state, projectNeedRefresh: action.payload};*/

        default:
            return state;
    }
};