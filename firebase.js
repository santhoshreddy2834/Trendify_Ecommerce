import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn5gFLLeLEcrXts5c-IxnKpMG9mrOqqr0",
  authDomain: "trendify-ecommerce.firebaseapp.com",
  projectId: "trendify-ecommerce",
  storageBucket: "trendify-ecommerce.firebasestorage.app",
  messagingSenderId: "210252262583",
  appId: "1:210252262583:web:0391a891d4c18ada21b132",
  measurementId: "G-Y2SS9ZZD0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export for use in Login.jsx
export {
  auth,
  googleProvider,
  facebookProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
};
