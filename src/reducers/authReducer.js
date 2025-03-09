const defaultState = {
    isAuth: false,
    authUser: {},
    authLoading: false,
    tokenLoading: false,
};

export const authReducer = (state = defaultState, action) => {
    switch(action.type){
        case "IS_AUTH":
            return {...state, isAuth: action.payload};
        case "AUTH_USER":
            return {...state, authUser: action.payload};
        case "AUTH_LOADING":
            return {...state, authLoading: action.payload};
        case "TOKEN_LOADING":
            return {...state, tokenLoading: action.payload};

        default:
            return state;
    }
};