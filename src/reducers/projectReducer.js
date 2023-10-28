const defaultState = {
    //projects: [],
    //projectAddModalVisible: false,
    //projectUpdModalVisible: false,
    projectModalVisible: false,
    ///projectNeedRefresh: false
};

export const projectReducer = (state = defaultState, action) => {
    switch(action.type){
        /*case "PROJECT_FETCH_ALL":
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
            */


        /*case "PROJECT_CURRENT_ID":
            //return {...state, projectCurrentId: action.payload};
            return {...state, projectCurrentId: localStorage.setItem('projectCurrentId',action.payload)};*/

        /*case "PROJECT_ADD_MODAL_VISIBLE":
            return {...state, projectAddModalVisible: action.payload};
        case "PROJECT_UPD_MODAL_VISIBLE":
            return {...state, projectUpdModalVisible: action.payload};
            */
        case "PROJECT_MODAL_VISIBLE":
            return {...state, projectModalVisible: action.payload};


        /*case "PROJECT_NEED_REFRESH":
            return {...state, projectNeedRefresh: action.payload};*/


        default:
            return state;
    }
};
