import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAvC-mFDwJspSVVDvXD4qXXHcpZ9vwo2ek",
    authDomain: "boulderbabes-19784.firebaseapp.com",
    databaseURL: "https://boulderbabes-19784.firebaseio.com",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
