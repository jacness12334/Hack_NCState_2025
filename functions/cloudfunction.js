// src/firebase/cloudFunctions.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Cloud Function to send notifications on claim
exports.sendClaimNotification = functions.firestore
  .document("donations/{donationId}")
  .onUpdate((change, context) => {
    const donation = change.after.data();
    if (donation.status === "claimed") {
      // You can send notifications or any other backend task here
    }
    return null;
  });
