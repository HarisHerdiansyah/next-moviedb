// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO7pRl137m_goq1NVBRxUZRKRyRHlyFYM",
  authDomain: "nextmovie-db.firebaseapp.com",
  projectId: "nextmovie-db",
  storageBucket: "nextmovie-db.appspot.com",
  messagingSenderId: "559183392973",
  appId: "1:559183392973:web:2044516e125de4976ff984",
  measurementId: "G-F7TMJZEQY7"
};

// Initialize Firebase
const instanceApp = initializeApp(firebaseConfig);
export const database = getDatabase(instanceApp)