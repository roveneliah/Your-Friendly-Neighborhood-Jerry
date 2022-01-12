const functions = require("firebase-functions");
const channel_ids = require('./config/channel_ids')

module.exports = {
    ...channel_ids,
    discordKey: functions.config().discordbot.key,
    notionKey: functions.config().notion.key,
    proposals_db_id: functions.config().proposals_db_id,
    bounties_db_id: functions.config().notion.bounties_db_id
}

