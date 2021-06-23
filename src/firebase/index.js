import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCPiBzXKWEqAUAhi65QBTMVWahUzRtU3Qg",
    authDomain: "klip-website.firebaseapp.com",
    projectId: "klip-website",
    storageBucket: "klip-website.appspot.com",
    messagingSenderId: "527197944499",
    appId: "1:527197944499:web:756fc3e710f4e0294e4ec6"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
