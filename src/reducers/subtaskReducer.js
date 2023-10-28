const defaultState = {
    subtaskModalVisible: false
};

export const subtaskReducer = (state = defaultState, action) => {
    switch(action.type){

        case "SUBTASK_MODAL_VISIBLE":
            return {...state, subtaskModalVisible: action.payload};


        default:
            return state;
    }
};
