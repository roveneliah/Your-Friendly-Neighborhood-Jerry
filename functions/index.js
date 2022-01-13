require("dotenv").config();
const functions = require("firebase-functions");
const { postSnapshotUpdate, postNotionUpdate, postBounties, postShoutoutsReminder } = require("./bot");

exports.snapshot = functions.pubsub
    .schedule("0 12 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = postSnapshotUpdate();
        promise.then(res => console.log("DONE") )
    });

// exports.notion = functions.pubsub
//     .schedule("* * * * *")
//     .timeZone("America/New_York")
//     .onRun(async (context) => {
//         const promise = postNotionUpdate();
//         promise.then(res => console.log("DONE") )
//     });

exports.bounties = functions.pubsub
    .schedule("24 10,22 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = postBounties();
        promise.then(res => console.log("Posted Bounties"))
    })


// exports.shoutoutsDay = functions.pubsub
//     .schedule("* * * * *")
//     .timeZone("America/New_York")
//     .onRun(async (context) => {
//         const promise = postShoutoutsReminder();
//         promise.then(res => console.log("Posted Shoutouts Day Reminder"))
//     })