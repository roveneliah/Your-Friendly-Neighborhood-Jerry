const functions = require('firebase-functions');
const { proposalDbUpdate } = require('./notion')

const getPostNotionUpdate = (client) => async () => {
    console.log("Getting newest Notion data.")
    await client.login(functions.config().discordbot.key);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(functions.config().channel_ids.kh)
        
        // NOTION SPECIFIC LOGIN HERE
        await channel.send(await proposalDbUpdate());
        process.exit(1);
    })
}

module.exports = { getPostNotionUpdate }