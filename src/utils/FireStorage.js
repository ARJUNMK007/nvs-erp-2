import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDW8d29IjKdvy7J6kSn28RU7py5Y9xvsgs",
  authDomain: "nvs-heaters.firebaseapp.com",
  databaseURL: "https://nvs-heaters-default-rtdb.firebaseio.com",
  projectId: "nvs-heaters",
  storageBucket: "nvs-heaters.appspot.com",
  messagingSenderId: "382559790755",
  appId: "1:382559790755:web:28bad4adae7697269cc116",
  measurementId: "G-JRH1912C6G"
  };

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;