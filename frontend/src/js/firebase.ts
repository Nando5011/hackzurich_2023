// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDZwq8by5PIZJWC_HOfWemvrMNSxXvaII",
  authDomain: "hackzurich2023-2.firebaseapp.com",
  projectId: "hackzurich2023-2",
  storageBucket: "hackzurich2023-2.appspot.com",
  messagingSenderId: "146233828909",
  appId: "1:146233828909:web:df21d91a27afd09087baa4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
