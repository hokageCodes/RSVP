import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAeibQxm7BICAIUcoTn_b_crBz9ahk07Es",
    authDomain: "yomi-emelda.firebaseapp.com",
    projectId: "yomi-emelda",
    storageBucket: "yomi-emelda.appspot.com",
    messagingSenderId: "1025433379110",
    appId: "1:1025433379110:web:f94e0dc60d94341ee921e7",
    measurementId: "G-PESRBJR1NZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
