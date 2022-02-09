const functions = require("firebase-functions");
const channel_ids = require('./config/channel_ids')

module.exports = {
    ...channel_ids,
    discordKey: functions.config().discordbot.key,
    notionKey: functions.config().notion.key,
    proposals_db_id: functions.config().proposals_db_id,
    bounties_db_id: functions.config().notion.bounties_db_id,
    messagingSenderId: functions.config().firestore.messagingsenderid,
    authDomain: functions.config().firestore.authdomain,
    projectId: functions.config().firestore.projectid,
    storageBucket: functions.config().firestore.storagebucket,
    appId: functions.config().firestore.appid,
    apiKey: functions.config().firestore.apikey,
}

