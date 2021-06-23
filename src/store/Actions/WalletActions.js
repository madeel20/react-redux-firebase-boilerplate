import { message } from "antd";
import { auth, firestore } from "../../firebase";
import { convertToArray } from "../../utils/helpers";
import Wallet from "../Constants/Wallet"

/**
 * This Action is used to fetch all the packages
 * @returns {null}
 */
export const getPackages = () => async dispatch => {

    dispatch({ type: Wallet.GET_PACKAGES, payload: { loading: true } });

    try {
        // get packages from firestore
        const res = await firestore.collection('packages').get();
        dispatch({ type: Wallet.GET_PACKAGES, payload: { loading: false, packages: convertToArray(res.docs) } });

    } catch (error) {

        console.log(error);
        message.error(error?.message);
        dispatch({ type: Wallet.GET_PACKAGES, payload: { loading: false } });

    }

}

/**
 * This Action is used to fetch user wallet
 * @returns {null}
 */
export const getWallet = () => async dispatch => {

    dispatch({ type: Wallet.GET_WALLET, payload: { getWalletLoading: true } });

    try {
        // get user wallet
        const res = await firestore.collection('wallets').where('uid', '==', auth.currentUser.uid).get();
        dispatch({ type: Wallet.GET_WALLET, payload: { getWalletLoading: false, wallet: res.docs[0].data() } });

    } catch (error) {

        console.log(error);
        message.error(error?.message);
        dispatch({ type: Wallet.GET_WALLET, payload: { getWalletLoading: false } });

    }

}

/**
 * This Action is used to update G value in wallet
 * @returns {null}
 */
export const addG = (amount,costInP) => async (dispatch, getState) => {

    dispatch({ type: Wallet.ADD_G, payload: { addWalletLoading: true } });

    try {

        // get user wallet
        const res = await firestore.collection('wallets').where('uid', '==', auth.currentUser.uid).get();
        let userWallet = res.docs[0].data();

        // first check if user has enough P 
        if (userWallet?.p >= costInP) {

            // update G value and P values
            await firestore.collection('wallets').doc(res.docs[0].id).update({
                g: userWallet?.g + parseInt(amount),
                p: userWallet.p - parseInt(costInP)
            });

            // update values in redux
            dispatch({
                type: Wallet.ADD_G, payload: {
                    addWalletLoading: false,
                    wallet: {
                        ...getState().wallet.wallet,
                        g: userWallet?.g + parseInt(amount),
                        p: userWallet?.p - parseInt(costInP)
                    }
                }
            });
            message.success('Purchase successful!');
        }
        else {
            // if not enough P, show error and end action
            message.error("Not enough P's!");
            dispatch({ type: Wallet.ADD_G, payload: { addWalletLoading: false } });

            return;
        }


    } catch (error) {

        console.log(error);
        message.error(error?.message);
        dispatch({ type: Wallet.ADD_G, payload: { addWalletLoading: false } });

    }

}
/**
 * This Action is used to  update P value in wallet
 * @returns {null}
 */
export const addP = (amount) => async (dispatch, getState) => {

    dispatch({ type: Wallet.ADD_P, payload: { addWalletLoading: true } });

    try {
        // get user wallet
        const res = await firestore.collection('wallets').where('uid', '==', auth.currentUser.uid).get();
        let userWallet = res.docs[0].data();
        // update P value
        await firestore.collection('wallets').doc(res.docs[0].id).update({ p: userWallet?.p + parseInt(amount) });

        dispatch({ type: Wallet.ADD_P, payload: { addWalletLoading: false, wallet: { ...getState().wallet.wallet, p: userWallet?.p + parseInt(amount) } } });
        message.success('Purchase successful!');

    } catch (error) {

        console.log(error);
        message.error(error?.message);
        dispatch({ type: Wallet.ADD_P, payload: { addWalletLoading: false } });

    }

}