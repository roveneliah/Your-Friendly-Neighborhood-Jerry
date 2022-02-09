require("dotenv").config();
const functions = require("firebase-functions");
const { postSnapshotUpdate, postNotionUpdate, postBounties, postShoutoutsReminder, fetchUsers } = require("./bot");

exports.snapshot = functions.pubsub
    .schedule("0 20 * * *")
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

exports.fetchUsers = functions.pubsub
    .schedule("25 2 * * *")
    .timeZone("America/New_York")
    .onRun(async (context) => {
        const promise = fetchUsers();
        promise.then(res => console.log("UPDATED USER DB") )
    });


exports.bounties = functions.pubsub
    .schedule("30 11 1,7,14,21,28 * *")
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