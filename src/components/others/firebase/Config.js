// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT3JbPzQEkpeDDSzZBwzc6P5V1Vqu1QDI",
  authDomain: "santonishop-5dc4f.firebaseapp.com",
  projectId: "santonishop-5dc4f",
  storageBucket: "santonishop-5dc4f.appspot.com",
  messagingSenderId: "31353277218",
  appId: "1:31353277218:web:33446a5e212f6db43eb37b",
  measurementId: "G-9BBKGM3HXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);