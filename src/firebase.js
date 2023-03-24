// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWnNCLZg8ObNGN8d0WLGZR7eLObcNnc4g",
  authDomain: "rsvp-17c7b.firebaseapp.com",
  databaseURL: "https://rsvp-17c7b-default-rtdb.firebaseio.com",
  projectId: "rsvp-17c7b",
  storageBucket: "rsvp-17c7b.appspot.com",
  messagingSenderId: "287348157655",
  appId: "1:287348157655:web:4af470413717f656189492"
};

// Initialize Firebase
config = firebase.initializeApp(firebaseConfig);
database = firebase.database();

export default firebaseConfig;

