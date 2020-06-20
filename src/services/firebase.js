import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAvC-mFDwJspSVVDvXD4qXXHcpZ9vwo2ek",
    authDomain: "boulderbabes-19784.firebaseapp.com",
    databaseURL: "https://boulderbabes-19784.firebaseio.com",
    projectId: "boulderbabes-19784",
    storageBucket: "boulderbabes-19784.appspot.com",
    messagingSenderId: "958024144152",
    appId: "1:958024144152:web:6dfc848202d700c0defa6d",
    measurementId: "G-R3QR0QBXTZ"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const realTime = firebase.database();
export const db = firebase.firestore();