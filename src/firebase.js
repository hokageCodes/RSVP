import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDn-Y2saWi9vClRlNbK7nvaZm1POl77Ef4",
    authDomain: "rsvp-3ffd8.firebaseapp.com",
    projectId: "rsvp-3ffd8",
    storageBucket: "rsvp-3ffd8.appspot.com",
    messagingSenderId: "83001791323",
    appId: "1:83001791323:web:ba6d49714bffb5de1c007e",
    measurementId: "G-FL04ERLS0T"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
