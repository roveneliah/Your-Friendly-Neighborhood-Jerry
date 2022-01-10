const functions = require('firebase-functions');
const { Client: NotionClient } = require("@notionhq/client")

const { map, nestedMapProp, mapProp, compose, pick, prop, head, len, bold, either, contains, printPass } = require("./functions");
const { filter } = require('ramda');
const log = (msg) => (x) => { console.log(msg); return x; }

// Initializing a client
const notion = new NotionClient({
  auth: functions.config().notion.key,
})

const getProposals = async () => (
  notion.databases.query({
    database_id: functions.config().notion.proposals_db_id
  })
)

const fields = ["url", "Name of Project", "Approve", "Abstain", "Needs Edits", "Status"];
const resultLens = compose(
    map(pick(fields)),
    map(prop("properties")),
    map((o) => ({ ...o, properties: { ...o.properties, url: o.url }})), // write url into properties nest
    prop("results"),
  );

const formatResult = compose(
  mapProp("Name of Project")(bold),
  nestedMapProp("Approve")("multi_select")(len),
  nestedMapProp("Needs Edits")("multi_select")(len),
  nestedMapProp("Abstain")("multi_select")(len),
  nestedMapProp("Name of Project")("title")(compose(prop("plain_text"), head)),
  nestedMapProp("Status")("multi_select")(map(prop("name"))),
)

const toDiscordMessage = (proposal) => (
`${proposal["Name of Project"]}
${proposal.url}
For: ${proposal["Approve"]}
Against: ${proposal["Needs Edits"]}
Abstain: ${proposal["Abstain"]}`
)

const proposalDbUpdate = async () => {
    const head = `${bold("Proposals Under Review")}\n\n`;

    const messages = await getProposals()
        .then(resultLens)
        .then(map(formatResult))
        .then(filter(({ Status }) => either(contains("Ready for Review"), contains("Conditional Approval"))(Status)))
        .then(map(toDiscordMessage))

    const content = messages.join(`\n\n`)
    return head + content;
}

module.exports = {
    proposalDbUpdate
}