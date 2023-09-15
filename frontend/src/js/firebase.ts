// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvtLA9rTf6Nc74ZKyeGP1QXFl0svma30w",
  authDomain: "hackzurich2023-502ac.firebaseapp.com",
  databaseURL:
    "https://hackzurich2023-502ac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hackzurich2023-502ac",
  storageBucket: "hackzurich2023-502ac.appspot.com",
  messagingSenderId: "659583248270",
  appId: "1:659583248270:web:1e4903e77a7ae0c20da6df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
