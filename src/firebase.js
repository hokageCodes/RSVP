// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn-Y2saWi9vClRlNbK7nvaZm1POl77Ef4",
  authDomain: "rsvp-3ffd8.firebaseapp.com",
  databaseURL: "https://rsvp-3ffd8-default-rtdb.firebaseio.com",
  projectId: "rsvp-3ffd8",
  storageBucket: "rsvp-3ffd8.appspot.com",
  messagingSenderId: "83001791323",
  appId: "1:83001791323:web:ba6d49714bffb5de1c007e",
  measurementId: "G-FL04ERLS0T"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);