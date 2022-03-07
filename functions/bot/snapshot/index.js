const functions = require("firebase-functions");
const { getProposals } = require('../../api/snapshot.js');
const { len, printPass } = require('../notion/functions.js');
const removeMd = require('remove-markdown');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: functions.config().openai.apikey
});
const openai = new OpenAIApi(configuration);


const getSummary = async (proposal) =>
    await openai.createCompletion("text-davinci-001", {
        prompt: `Summarize the following community proposal: \n\n ${proposal}`,
        temperature: 0.7,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then(res => res.data.choices[0].text)
      .then(printPass)
      .catch(e => console.log("got error from open ai.", e))

const format = ({title, id, summary}) => (
`🗳 **${title}**
https://snapshot.org/#/tecommons.eth.eth/proposal/${id}${summary ? `

***AI Generated Summary***
${summary.trim()}` : ""}

----------------------------------------------------------------------------------------`
)


const proposals = async () => {
    const proposals = await getProposals();
    console.log("proposals", proposals)
    if (!len(proposals)) return null;
    const head = `----------------------------------------------------------------------------------------\n**LIVE PROPOSALS**\n`

    const summaries = await Promise.all(proposals.map(p => getSummary(removeMd(p.body))));

    const formatted = [
        head, 
        ...proposals
            .map((p, i) => ({ ...p, summary: summaries[i]}))
            .map(format)
            .map(printPass)
    ];
    const content = formatted.join(`\n\n`);
    return content;
}

module.exports = {
    proposals
}