// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase-admin/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsEWedNKdtlsbEKR42hafFLzK_asO5g9E",
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

export{app, auth};