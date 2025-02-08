// src/firebase/firestore.js
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// Function to donate food
export const donateFood = async (foodName, quantity, expirationDate, donorId) => {
  try {
    const docRef = await addDoc(collection(db, "donations"), {
      foodName,
      quantity,
      expirationDate,
      donorId,
      status: "available",
    });
    return docRef.id; // Return the document ID for further use
  } catch (error) {
    console.error("Error donating food:", error.message);
    throw error;
  }
};

// Function to fetch available donations
export const getAvailableDonations = async () => {
  try {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    const querySnapshot = await getDocs(q);
    const donations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error.message);
    throw error;
  }
};

// Function to claim food (update donation status)
export const claimFood = async (donationId, recipientId) => {
  try {
    const donationRef = doc(db, "donations", donationId);
    await updateDoc(donationRef, { status: "claimed" });

    // You can also add a claim entry in the "claims" collection if needed
    await addDoc(collection(db, "claims"), {
      donationId,
      recipientId,
      claimDate: new Date(),
    });
  } catch (error) {
    console.error("Error claiming food:", error.message);
    throw error;
  }
};
