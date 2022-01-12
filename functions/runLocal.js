const { Client, Intents } = require('discord.js')

// const { getPostSnapshotUpdate } = require('./bot/postSnapshotUpdate');
// const { getPostNotionUpdate } = require("./bot/postNotionUpdate");
const { getPostBounties } = require('./bot/postBounties')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,  
  ]
});

// Remember to change config import //
// const postSnapshotUpdate = getPostSnapshotUpdate(client);
// const postNotionUpdate = getPostNotionUpdate(client);
const postBounties = getPostBounties(client);

postBounties();