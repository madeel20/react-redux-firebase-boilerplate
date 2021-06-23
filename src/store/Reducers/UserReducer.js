import Users from "../Constants/Users";

const initialState = {
    loading:false,
    signUpLoading:false,
    user:null,
    signInLoading:false,
    forgotPasswordLoading:false,
    changePasswordLoading:false,
    data:{}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case Users.GET_USER_DATA:
        case Users.CREATE_USER_ACCOUNT:
        case Users.LOGIN_USER:
        case Users.FORGOT_PASSWORD:
        case Users.CHANGE_PASSWORD:
            return {...state, ...action.payload };
        default:
            return state;
    }
};
