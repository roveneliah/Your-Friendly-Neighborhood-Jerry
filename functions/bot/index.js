const { Client, Intents } = require('discord.js')

const { getPostSnapshotUpdate } = require('./postSnapshotUpdate');
const { getPostNotionUpdate } = require("./postNotionUpdate");
const { getPostBounties } = require('./postBounties');
const { getPostShoutoutsReminder } = require('./postShoutoutsReminder');
const { getFetchUsers } = require('./fetchUsers');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,  
    Intents.FLAGS.GUILD_MEMBERS,
  ]
});

module.exports = {
  postSnapshotUpdate: getPostSnapshotUpdate(client),
  postNotionUpdate: getPostNotionUpdate(client),
  postBounties: getPostBounties(client),
  postShoutoutsReminder: getPostShoutoutsReminder(client),
  fetchUsers: getFetchUsers(client)
}