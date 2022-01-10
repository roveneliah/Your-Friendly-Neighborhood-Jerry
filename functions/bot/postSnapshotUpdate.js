const functions = require('firebase-functions');
const { proposals } = require('./snapshot')

const getPostSnapshotUpdate = (client) => async () => {
    console.log("Getting newest Snapshot data.")
    await client.login(functions.config().discordbot.key);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(functions.config().channel_ids.kh_general)
        await channel.send(await proposals());
        await channel.send("https://media.giphy.com/media/Swrnq3LiE8d3M7feEZ/giphy.gif");
        process.exit(1);
    })
}

module.exports = { getPostSnapshotUpdate }