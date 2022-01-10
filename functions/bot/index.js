const { Client, Intents } = require('discord.js')

const { getPostSnapshotUpdate } = require('./postSnapshotUpdate');
const { getPostNotionUpdate } = require("./postNotionUpdate");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,  
  ]
});

module.exports = {
  postSnapshotUpdate: getPostSnapshotUpdate(client),
  postNotionUpdate: getPostNotionUpdate(client)
}