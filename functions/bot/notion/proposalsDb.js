const { map, nestedMapProp, mapProp, compose, pick, prop, head, len, bold, either, contains, printPass, pipe } = require("./functions");
const { filter, lensProp, view } = require('ramda');


const getProposals = async (notion, database_id) => (
    notion.databases.query({
      database_id
    })
)
  
const fields = ["url", "Name of Project", "Approve", "Abstain", "Needs Edits", "Status"];
const resultLens = compose(
    map(pick(fields)),
    map(prop("properties")),
    map((o) => ({ ...o, properties: { ...o.properties, url: o.url }})), // write url into properties nest
    prop("results"),
);
  
  // interesting f's to refactor below, v unclear even if concise
  // const overPath = (f) => (path) => over(lensPath(path), f);
  // const viewPath = (path) => view(lensPath(path))
  // replace set lens1 to lens2
  // const f = pipe(
  //   overPath(len, "Approve"),
  //   viewPath(["Approve", "multi_select"]),
  //   over(lensProp("Approve"), (x) => (x))
  // );
  
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
  
const proposalDbUpdate = (notion, database_id) => async() => {
    const head = `${bold("Proposals Under Review")}\n\n`;
  
    const messages = await getProposals(notion, database_id)
        .then(resultLens)
        .then(map(formatResult))
        .then(filter(({ Status }) => either(contains("Ready for Review"), contains("Conditional Approval"))(Status)))
        .then(map(toDiscordMessage))
  
    const content = messages.join(`\n\n`)
    return head + content;
}

module.exports = { proposalDbUpdate }