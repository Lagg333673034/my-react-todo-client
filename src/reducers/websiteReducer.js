const defaultState = {
    websiteVisible: true,
    websiteInfoModalVisible: false,
};

export const websiteReducer = (state = defaultState, action) => {
    switch(action.type){
        case "WEBSITE_VISIBLE":
            return {...state, websiteVisible: action.payload};
        case "WEBSITE_INFO_MODAL_VISIBLE":
            return {...state, websiteInfoModalVisible: action.payload};


        default:
            return state;
    }
};