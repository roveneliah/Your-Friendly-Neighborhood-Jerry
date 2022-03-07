const functions = require("firebase-functions");
const { proposals } = require('./snapshot')
const removeMd = require('remove-markdown')
const { discordKey, kh_general, test } = require('../config')

const { Configuration, OpenAIApi } = require("openai");
const { getProposals } = require('../api/snapshot');
const { head, prop } = require('ramda');
const compose = require('ramda/src/compose');
const { splitEvery } = require("ramda");

const configuration = new Configuration({
  apiKey: functions.config().openai.apikey,
});
const openai = new OpenAIApi(configuration);

const getPostSnapshotSummaries = (client) => async () => {
    console.log("Geeting Snapshot Summaries of Live Proposals.")
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(test);
        const proposals = await getProposals();
        const proposalMd = compose(removeMd, prop("body"), head)(proposals);
        if (proposals) {
            const prompt = `Summarize the following community proposal: \n\n ${proposalMd}`
            await openai.createCompletion("text-davinci-001", {
                prompt,
                temperature: 0.7,
                max_tokens: 832,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .catch(e => channel.send("got error from open ai.", e))
              .then(res => channel.send(res.data.choices[0].text))
        }
    })
}

const getPostSnapshotUpdate = (client) => async () => {
    console.log("Getting newest Snapshot data.")
    await client.login(discordKey);
    client.once('ready', async () => {
        const channel = client.channels.cache.get(test)
        const messages = await proposals();
        if (messages) {
            const messagesSplit = splitEvery(2000, messages);
            messagesSplit.map(msg => channel.send(msg)); // but can't split in the middle of a one part...
            await channel.send("https://media.giphy.com/media/Swrnq3LiE8d3M7feEZ/giphy.gif");
        }
        process.exit(1);
    })
}

module.exports = { getPostSnapshotUpdate, getPostSnapshotSummaries }