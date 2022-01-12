require('dotenv').config()
const channel_ids = require('./config/channel_ids')

module.exports = {
    ...channel_ids,
    discordKey: process.env.DISCORD_BOT_TOKEN,
    notionKey: process.env.NOTION,
    proposals_db_id: process.env.PROPOSALS_DB,
    bounties_db_id: process.env.BOUNTIES_DB,
}