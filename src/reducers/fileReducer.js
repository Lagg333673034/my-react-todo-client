const defaultState = {
    fileModalVisible: false
};

export const fileReducer = (state = defaultState, action) => {
    switch(action.type){

        case "FILE_MODAL_VISIBLE":
            return {...state, fileModalVisible: action.payload};


        default:
            return state;
    }
};
