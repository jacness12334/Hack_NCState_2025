// src/firebase/auth.js
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// SignUp function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};


export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //result.user
  return result;
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return doSendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home` ,
//   });
// };
