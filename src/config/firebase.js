// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBoDPOfrNFar0_xgO6-NXKRFwKncEHHQl0",
    authDomain: "koupersonelatamasistemi.firebaseapp.com",
    databaseURL: "https://koupersonelatamasistemi-default-rtdb.firebaseio.com",
    projectId: "koupersonelatamasistemi",
    storageBucket: "koupersonelatamasistemi.firebasestorage.app",
    messagingSenderId: "896479046554",
    appId: "1:896479046554:web:fa244f715703be976ee823",
    measurementId: "G-R7XZL373ER"
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
