import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  authDomain: "hunger-helpers-d203e.firebaseapp.com",
  databaseURL: "https://hunger-helpers-d203e-default-rtdb.firebaseio.com",
  projectId: "hunger-helpers-d203e",
  storageBucket: "hunger-helpers-d203e.firebasestorage.app",
  messagingSenderId: "590548938748",
  appId: "1:590548938748:web:4c1698fdf23cc58a6a4c79",
  measurementId: "G-CWNCL1SS6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore};
