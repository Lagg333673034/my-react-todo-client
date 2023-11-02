const defaultState = {
    files: [],
    fileListModalVisible: false

};

export const fileReducer = (state = defaultState, action) => {
    switch(action.type){
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
        case "FILE_LIST_MODAL_VISIBLE":
            return {...state, fileListModalVisible: action.payload};


        default:
            return state;
    }
};
