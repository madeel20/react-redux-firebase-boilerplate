import { getFirestoreCollectionByField } from "../../firebase/helpers";
import Users from "../Constants/Users";
import Wallet from "../Constants/Wallet";
import { convertToArray } from "../../utils/helpers";
import { auth, firestore } from "../../firebase";
import { message } from "antd";

/**
 * This mehtod will do all the steps for signup for the user
 * @param {object} data - get all the fields for signup 
 */
export const signup = (data, CB ) => async dispatch => {
    try {

        dispatch({ type: Users.CREATE_USER_ACCOUNT, payload: { signUpLoading: true } });

        const { email, password, firstName, lastName } = data;

        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        // save user info to firestore
        await firestore.collection('users').add({ email, firstName, lastName, uid: userCredential.user.uid });
        // save user wallet
        await firestore.collection('wallets').add({ g:0,p:0, uid: userCredential.user.uid });
        // send verification mail.
        await userCredential.user.sendEmailVerification({url:'https://engagementrate-io.web.app/sign-in'});

        dispatch({ type: Users.CREATE_USER_ACCOUNT, payload: { signUpLoading: false, user: userCredential.user } });
        
        message.success('Account created successfully!');
        
        CB && CB();

    }
    catch (error) {
        console.log(error);
        message.error(error?.message);
        dispatch({ type: Users.CREATE_USER_ACCOUNT, payload: { signUpLoading: false } });
    }


}


/**
 * This method is used to sign in user
 * @param {object} data - get all the fields for signup 
 */
 export const signIn = (data, CB ) => async dispatch => {
    try {

        dispatch({ type: Users.LOGIN_USER, payload: { signInLoading: true } });

        const { email, password } = data;

        const userCredential = await auth.signInWithEmailAndPassword(email, password);

        dispatch({ type: Users.LOGIN_USER, payload: { signInLoading: false, user: userCredential.user } });
        
        message.success('Sign in successfully!');
        
        CB && CB();

    }
    catch (error) {
        console.log(error);
        message.error(error?.message);
        dispatch({ type: Users.LOGIN_USER, payload: { signInLoading: false } });
    }


}


/**
 * This method is to send user forgot pass email
 * @param {string} email - email of the user
 */
 export const forgotPassword = (email, CB ) => async dispatch => {
    try {

        dispatch({ type: Users.FORGOT_PASSWORD, payload: { forgotPasswordLoading: true } });

        await auth.sendPasswordResetEmail(email, { url:'https://engagementrate-io.web.app/sign-in' });

        dispatch({ type: Users.FORGOT_PASSWORD, payload: { forgotPasswordLoading:false } });
        
        message.success('Password reset link sent to ' + email);
        
        CB && CB();

    }
    catch (error) {
        console.log(error);
        message.error(error?.message);
        dispatch({ type: Users.FORGOT_PASSWORD, payload: { forgotPasswordLoading: false } });
    }


}


/**
 * This method is to change password of a user
 * @param {number} newPassword - new password of the user
 */
 export const changePassword = (newPassword, CB ) => async dispatch => {
    try {

        dispatch({ type: Users.CHANGE_PASSWORD, payload: { changePasswordLoading: true } });

        await auth.currentUser.updatePassword(newPassword);

        dispatch({ type: Users.CHANGE_PASSWORD, payload: { changePasswordLoading:false } });
        
        message.success('Password changed successfully!');
        
        CB && CB();

    }
    catch (error) {
        console.log(error);
        message.error(error?.message,5000);
        dispatch({ type: Users.CHANGE_PASSWORD, payload: { changePasswordLoading: false } });
    }


}


export const getUserData = (data, CB) => async (dispatch) => {

    dispatch({ type: Users.GET_USER_DATA, payload: { loading: true } });

    await getFirestoreCollectionByField('users', 'email', auth.currentUser.email).then(res => {
        dispatch({ type: Users.GET_USER_DATA, payload: { loading: false, data: convertToArray(res)[0] } });
        CB && CB();
    })
        .catch((error) => {
            console.log(error);
            dispatch({ type: Users.GET_USER_DATA, loading: false });
        });
};


export const setUser = (value, CB) => async (dispatch) => {
    dispatch({ type: Users.GET_USER_DATA, payload: { user: value } });
};

export const logout = (CB) => async (dispatch) => {

    auth.signOut().then(()=>{
        
        // empty user wallet 
        dispatch({type: Wallet.GET_WALLET, payload: { wallet: {g:0,p:0} } });
        
        CB && CB();
        message.success('Signed out successfully!');

    });

};