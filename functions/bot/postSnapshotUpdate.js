const { proposals } = require('./snapshot')
const { discordKey, kh_general } = require('../config')

const getPostSnapshotUpdate = (client) => async () => {
    console.log("Getting newest Snapshot data.")
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(kh_general)
        const messages = await proposals();
        if (proposals) {
            await channel.send(messages);
            await channel.send("https://media.giphy.com/media/Swrnq3LiE8d3M7feEZ/giphy.gif");
        }
        process.exit(1);
    })
}

module.exports = { getPostSnapshotUpdate }