import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7HZAw7pg6f7JOrEuwprP6f4C6yKC6smw",
  authDomain: "safephone-web.firebaseapp.com",
  projectId: "safephone-web",
  storageBucket: "safephone-web.firebasestorage.app",
  messagingSenderId: "816300851548",
  appId: "1:816300851548:web:921c52343832fd07ca0199",
  measurementId: "G-FTQF3KVHFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);