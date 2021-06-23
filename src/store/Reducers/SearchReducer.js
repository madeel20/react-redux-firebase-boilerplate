import Search from "../Constants/Search";

const initialState = {
    loading:false,
    data:[]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case Search.GET_SEARCH_ITEMS:
            return {...state, ...action.payload };
        default:
            return state;
    }
};
