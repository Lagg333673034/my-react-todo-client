const defaultState = {
    commentModalVisible: false
};

export const commentReducer = (state = defaultState, action) => {
    switch(action.type){

        case "COMMENT_MODAL_VISIBLE":
            return {...state, commentModalVisible: action.payload};


        default:
            return state;
    }
};
