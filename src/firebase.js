import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoYadoKZiFojir3gg_rnevgST_Ma05Qag",
  authDomain: "rsvp-a1dd7.firebaseapp.com",
  projectId: "rsvp-a1dd7",
  storageBucket: "rsvp-a1dd7.appspot.com",
  messagingSenderId: "1026211500185",
  appId: "1:1026211500185:web:998b7bedaf0a6993712808"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();
export default firebaseConfig;

