const { discordKey, kh_general, test, kh_test } = require('../config')
const { bold } = require('./notion/functions')

const getPostShoutoutsReminder = (client) => async () => {
    console.log("I am the v1b3l0rd.");
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(kh_test);

        const message = 
`
---------------------------------

🥳 ${bold("FRIDAY == SHOUTOUTS DAY")} 🥳
Shoutouts Day is where we post one shoutout to someone who's been putting the team on their back and embodying Jerry values.  Tag someone and let us know why. @everyone

ex: shoutout to @lebron for starting a weekly newsletter. we know you're a busy guy, so much appreciated. great stuff, keep it up!

---------------------------------
`


        // await channel.send("https://tenor.com/view/bulls-fans-parade-happy-get-together-ballons-gif-13339014")
        await channel.send("https://tenor.com/view/game-nbafinals-raptors-party-champagne-gif-14340988");
        await channel.send(message);
        process.exit(1);
    })
}

module.exports = { getPostShoutoutsReminder }