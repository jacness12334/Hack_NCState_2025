
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, QuerySnapshot} = require("firebase-admin/firestore");

initializeApp();

exports.addfood = onRequest(async (req, res) => {
  const lat = Number(req.query.latitude);
  const long =Number( req.query.longitude);
  const name = req.query.name;
  const count = Number(req.query.count);
  
  const writeResult = await getFirestore()
      .collection("available")
      .add({lat: lat, long: long, name: name, count: count});

  res.json({result: `Food added. ID: ${writeResult.id}`});
});

exports.viewfood = onRequest(async (req, res)=>{
  const collection = await getFirestore()
      .collection("available");

  var result = new Array();

  collection.get().then(querySnapshot => {
    querySnapshot.forEach((doc) => {
      result.push({"data": doc.data(), "id": doc.id});
      console.log(doc.data());
    });


    res.json({response: result});
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });

});

exports.requestfood = onRequest(async (req, res) => {
  const doc = await getFirestore()
      .collection("available")
      .doc(req.query.id);
    
    const fulldoc = await doc.get().catch((error) => {
      console.log("Error getting document:", error);
    });
    
    
    const data = fulldoc.data();
    if (fulldoc.exists) {

      if(data.count < req.query.count){
        res.json(`Not enough ${req.query.name}`);
      }

      doc.set({
        count: data.count - req.query.count
      }, {merge: true})

      

      res.json(`Taken ${req.query.count} from ${req.query.name}(${req.query.id}). ${data.count - req.query.count} left.`)
    } else {
      res.json(`No such document!`);
    }
});

exports.removeEmpty = onDocumentUpdated("/available/{documentId}", event => {
    const snapshot = event.data.after;
    const snapdata = snapshot.data();

    console.log(snapdata);
    console.log(snapdata.count);

    if(snapdata.count === 0){
      snapshot.ref.delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }
});