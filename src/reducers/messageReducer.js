const defaultState = {
    msg: "",
    type: ""
};

export const messageReducer = (state = defaultState, action) => {
    switch(action.type){
        case "MESSAGE_MSG":
            return {...state, msg: action.payload};
        case "MESSAGE_TYPE":
            return {...state, type: action.payload};


        default:
            return state;
    }
};