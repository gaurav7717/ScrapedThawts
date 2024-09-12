// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLQVdsQWRpd4bJsbEX6hhKatPYhFvpO8g",
  authDomain: "glog-78380.firebaseapp.com",
  projectId: "glog-78380",
  storageBucket: "glog-78380.appspot.com",
  messagingSenderId: "997477542926",
  appId: "1:997477542926:web:d04b326fe470a4a21ce05f",
  measurementId: "G-QSSP1LB537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage= getStorage(app);
export{auth , db , storage};
