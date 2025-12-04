// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";   
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBYyrVYadwOJ0My2i-Gmm5vaPJ5LBk23w",
  authDomain: "jobcy-861f7.firebaseapp.com",
  projectId: "jobcy-861f7",
  storageBucket: "jobcy-861f7.firebasestorage.app",
  messagingSenderId: "741626874514",
  appId: "1:741626874514:web:8e728b42c0cbd167f9b44b",
  measurementId: "G-4XPTT69504"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;