require("dotenv").config();
const functions = require("firebase-functions");
const { postSnapshotUpdate, postNotionUpdate } = require("./bot");

exports.snapshot = functions.pubsub
    .schedule("0 9,21 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = postSnapshotUpdate();
        promise.then(res => console.log("DONE") )
    });

exports.notion = functions.pubsub
    .schedule("0 11 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = postNotionUpdate();
        promise.then(res => console.log("DONE") )
    });