const defaultState = {
    filesLoading: false,
    files: [],
    fileCurrent: null,
    fileListModalVisible: false,
    fileDelConfirmModalVisible: false,
};

export const fileReducer = (state = defaultState, action) => {
    switch(action.type){
        case "FILES_LOADING":
            return {...state, filesLoading: action.payload};
        case "FILE_FETCH_ALL":
            return {...state, files: action.payload};
        case "FILE_CREATE":
            return {...state, files: [...state.files, action.payload]};
        case "FILE_DELETE":
            return {
                ...state,
                files: state.files.filter((file) => (
                    file.taskId !== action.payload.taskId &&
                    file.fileNameUuid !== action.payload.fileNameUuid
                ))
            };

        case "FILE_CURRENT":
            return {...state, fileCurrent: action.payload};

        case "FILE_LIST_MODAL_VISIBLE":
            return {...state, fileListModalVisible: action.payload};
        case "FILE_DEL_CONFIRM_MODAL_VISIBLE":
            return {...state, fileDelConfirmModalVisible: action.payload};


        default:
            return state;
    }
};
