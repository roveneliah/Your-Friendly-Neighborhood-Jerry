const functions = require('firebase-functions');

const { Client, Intents } = require('discord.js')
const { proposals } = require('./functions')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,  
  ]
});

const getPostSnapshotUpdate = (client) => async () => {
    console.log("Getting newest Snapshot data.")
    // console.log(`TEST1: ${functions.config().discordbot.key}`);
    // console.log(`TEST2: ${functions.config().channel_ids.kh}`);
    client.login(functions.config().discordbot.key);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(functions.config().channel_ids.kh)
        await channel.send(await proposals());
        await channel.send("https://media.giphy.com/media/Swrnq3LiE8d3M7feEZ/giphy.gif");
    })
}

exports.postSnapshotUpdate = getPostSnapshotUpdate(client);