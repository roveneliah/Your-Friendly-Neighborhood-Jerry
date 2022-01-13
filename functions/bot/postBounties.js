const functions = require('firebase-functions');
const { bountiesDb } = require('./notion')
const { discordKey, kh_test, test, kh_general } = require('../localConfig');

const getPostBounties = (client) => async () => {
    console.log("Getting newest Bounties data from Notion.")
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(test)

        // NOTION SPECIFIC LOGIN HERE
        const gifs = [
            "https://tenor.com/view/hyped-celebrate-excited-applause-calp-gif-15741462",
            "https://tenor.com/view/clapping-the-worm-dennis-rodman-chicago-bulls-the-last-dance-gif-17000212",
            "https://tenor.com/view/golden-state-warriors-nba-celebration-gif-8781940",
            "https://tenor.com/view/lebron-james-chalk-toss-cavs-cleveland-cavaliers-nba-gif-16978822",
        ]
        await channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
        await channel.send(await bountiesDb());
        process.exit(1);
    })
}

module.exports = { getPostBounties }