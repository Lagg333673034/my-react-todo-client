const defaultState = {
    userLoading: false,
    users: [],
    userCurrentRow: null,
    userModalVisible: false,
    userDelModalVisible: false,
};

export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "USER_LOADING":
            return {...state, userLoading: action.payload};
        case "USER_FETCH_ALL":
            return {...state, users: action.payload};

        case "USER_CURRENT_ROW":
            return {...state, userCurrentRow: action.payload};
        case "USER_MODAL_VISIBLE":
            return {...state, userModalVisible: action.payload};
        case "USER_DEL_MODAL_VISIBLE":
            return {...state, userDelModalVisible: action.payload};


        default:
            return state;
    }
};