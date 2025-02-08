const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Send notification on claim
exports.sendClaimNotification = functions.firestore
  .document("donations/{donationId}")
  .onUpdate((change, context) => {
    const donation = change.after.data();
    if (donation.status === "claimed") {
      const recipientId = context.params.donationId;
      const message = {
        notification: {
          title: "Food Claimed!",
          body: `Your food donation has been claimed by a recipient.`,
        },
        topic: recipientId, // You can send the message to the recipient's topic
      };
      
      return admin.messaging().send(message);
    }
    return null;
  });
