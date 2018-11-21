//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



//var firebase = require('firebase');
var admin = require('firebase-admin');
//var fireabse = require('firebase')
const functions = require('firebase-functions');

const serviceAccount = require('./ServiceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://groceryapp-8a1b7.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("fcmTokens/user001");

exports.sendMessageNotification = functions.database.ref('orders').onWrite(event => {
    //if (event.data.previous.exists()) {
    //  return;
   // } 

    
  
   // This registration token comes from the client FCM SDKs.

// See documentation on defining a message payload.
var message = {
  "notification": {
      "title": "New Order",
      "body" : "You received a new order."
  },
}
ref.once("value", function(snapshot) {
 console.log("dsfsdfsd",snapshot.val());
  admin.messaging().sendToDevice(snapshot.val(), message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message to device-:', JSON.stringify(response));
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
});

// Send a message to the device corresponding to the provided
// registration token.

    
});