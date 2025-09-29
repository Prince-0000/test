// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoh2mSvl4f-Wxwm6JJtNHeYLbhv-AG_aQ",
  authDomain: "acquirewithash.firebaseapp.com",
  projectId: "acquirewithash",
  storageBucket: "acquirewithash.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "189085205378",
  appId: "1:189085205378:web:0938e92c86c201a705459b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
