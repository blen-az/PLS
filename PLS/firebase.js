// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // For authentication
import { getFirestore } from "firebase/firestore";  // For Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw_BF7sxeeVEmREhAQGoh7aJjMPchsIXM",
  authDomain: "plms-525ed.firebaseapp.com",
  projectId: "plms-525ed",
  storageBucket: "plms-525ed.firebasestorage.app",
  messagingSenderId: "155311259771",
  appId: "1:155311259771:web:a3e4705f27924d51c2e2de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db objects to use in other parts of your app
export { auth, db };
