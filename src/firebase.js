import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD9Bby4jqx0JQduR3sQ_ydZWhfTjiaGjo",
  authDomain: "rsvp-a35d9.firebaseapp.com",
  projectId: "rsvp-a35d9",
  storageBucket: "rsvp-a35d9.appspot.com",
  messagingSenderId: "74573557074",
  appId: "1:74573557074:web:210c6efea0eafa714a9e8b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebaseConfig;

