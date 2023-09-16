// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzUSeLToQ1X1vNW1brnkcHcWJif33HRxE",
  authDomain: "hackzurich23-8212.firebaseapp.com",
  projectId: "hackzurich23-8212",
  storageBucket: "hackzurich23-8212.appspot.com",
  messagingSenderId: "432778287112",
  appId: "1:432778287112:web:57017c368ff6c03d4899bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
