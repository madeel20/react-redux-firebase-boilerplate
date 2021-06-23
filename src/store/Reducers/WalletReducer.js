import Wallet from "../Constants/Wallet";

const initialState = {
    loading:false,
    packages:[],
    wallet:{},
    getWalletLoading:false,
    addWalletLoading:false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case Wallet.GET_PACKAGES:
        case Wallet.GET_WALLET:
        case Wallet.ADD_G:
        case Wallet.ADD_P:
            return {...state, ...action.payload };
        default:
            return state;
    }
};
