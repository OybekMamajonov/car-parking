// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbLNTZBa-LNONghkxPrXelcEbxSendA0I",
    authDomain: "car-parking-23.firebaseapp.com",
    projectId: "car-parking-23",
    storageBucket: "car-parking-23.firebasestorage.app",
    messagingSenderId: "254987246552",
    appId: "1:254987246552:web:b6cf1e2fdd97f81361b0ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);