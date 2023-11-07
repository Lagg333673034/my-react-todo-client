const defaultState = {
    documentVisible: true,
};

export const websiteReducer = (state = defaultState, action) => {
    switch(action.type){
        case "DOCUMENT_VISIBLE":
            return {...state, documentVisible: action.payload};

        default:
            return state;
    }
};