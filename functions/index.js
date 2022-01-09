require("dotenv").config();
const functions = require("firebase-functions");
const {postSnapshotUpdate} = require("./bot");

exports.daily = functions.pubsub
    .schedule("* 0,8,16 * * *")
    .onRun(async (context) => {
        console.log("Trying a new run!")
        const promise = postSnapshotUpdate();
        promise.then(res => console.log("DONE") )
    });