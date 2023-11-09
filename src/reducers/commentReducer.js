const defaultState = {
    commentsLoading: false,
    comments: [],
    commentCurrent: null,
    commentListModalVisible: false,
    commentModalVisible: false,
    commentDelConfirmModalVisible: false,
    commentToComment: null
};

export const commentReducer = (state = defaultState, action) => {
    switch(action.type){
        case "COMMENTS_LOADING":
            return {...state, commentsLoading: action.payload};
        case "COMMENT_FETCH_ALL":
            return {...state, comments: action.payload};
        case "COMMENT_CREATE":
            return {...state, comments: [...state.comments, action.payload]};
        case "COMMENT_DELETE":
            return {
                ...state,
                comments: state.comments.filter((comment) => comment._id !== action.payload)
            };

        case "COMMENT_CURRENT":
            return {...state, commentCurrent: action.payload};

        case "COMMENT_LIST_MODAL_VISIBLE":
            return {...state, commentListModalVisible: action.payload};
        case "COMMENT_MODAL_VISIBLE":
            return {...state, commentModalVisible: action.payload};
        case "COMMENT_DEL_CONFIRM_MODAL_VISIBLE":
            return {...state, commentDelConfirmModalVisible: action.payload};

        case "COMMENT_TO_COMMENT":
            return {...state, commentToComment: action.payload};



        default:
            return state;
    }
};
