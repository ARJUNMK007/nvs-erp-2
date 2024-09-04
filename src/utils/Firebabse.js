// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDW8d29IjKdvy7J6kSn28RU7py5Y9xvsgs",
  authDomain: "nvs-heaters.firebaseapp.com",
  databaseURL: "https://nvs-heaters-default-rtdb.firebaseio.com",
  projectId: "nvs-heaters",
  storageBucket: "nvs-heaters.appspot.com",
  messagingSenderId: "382559790755",
  appId: "1:382559790755:web:28bad4adae7697269cc116",
  measurementId: "G-JRH1912C6G",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the initialized Firebase app and services
export const auth = app.auth();
export const database = app.database();
export default firebase;
