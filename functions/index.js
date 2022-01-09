// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

require("dotenv").config();
const functions = require("firebase-functions");
const {postSnapshotUpdate} = require("./bot");

exports.daily = functions.pubsub
    .schedule("* * * * *")
    .timeZone("America/New_York")
    .onRun(postSnapshotUpdate());
