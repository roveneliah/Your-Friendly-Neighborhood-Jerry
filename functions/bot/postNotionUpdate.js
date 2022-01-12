const { proposalDbUpdate } = require('./notion');
const { discordKey, kh } = require('../config')

const getPostNotionUpdate = (client) => async () => {
    console.log("Getting newest Notion data.")
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(kh)
        
        // NOTION SPECIFIC LOGIN HERE
        await channel.send(await proposalDbUpdate());
        process.exit(1);
    })
}

module.exports = { getPostNotionUpdate }