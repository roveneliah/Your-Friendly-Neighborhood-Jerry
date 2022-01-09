require("dotenv").config();
const functions = require("firebase-functions");
const {postSnapshotUpdate} = require("./bot");

exports.daily = functions.pubsub
    .schedule("0 9,21 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = postSnapshotUpdate();
        promise.then(res => console.log("DONE") )
    });