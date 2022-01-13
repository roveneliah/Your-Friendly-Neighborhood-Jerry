const { map, compose, head, pick, prop, bold, printPass, nestedMapProp, italicize, composeP, composeWith, appendTo, spreadProp, joinWith, applyToProps, composeMaybe } = require("./functions");

const fetchNotionDb = (notion, database_id) => async () => (
    notion.databases.query({
      database_id
    })
)

const toDiscordMessage = ({ Name, Reward, Type, Contact, Description }) => 
`${bold(Name)} — ${italicize(Reward)}
${Description}
Reach out to @${Contact} to get started.`

const parseBounty = applyToProps({
  Name: composeMaybe([prop("plain_text"), head, prop("title")]),
  Reward: composeMaybe([prop("plain_text"), head, prop("rich_text")]),
  Type: composeMaybe([prop("name"), prop("select")]),
  Contact: composeMaybe([prop("name"), head, prop("multi_select")]),
  Description: composeMaybe([prop("plain_text"), head, prop("rich_text")])
})

const parseDiscordMsg = compose(
  toDiscordMessage,
  printPass,
  pick(["Name", "Reward", "Type", "Contact", "Description"]),
  parseBounty,
  spreadProp("properties")
)

const toDiscordMsg = compose(
  joinWith("\n\n"), 
  map(parseDiscordMsg),
  prop("results")
)

const HEADER = 
`${bold("Bounty Board Daily Update")}
Looking to help out?  Here's a list of oppurtunities curated by our team leads.
You can add your own bounties to the board here: https://bit.ly/3FtoGsE\n\n`

const bountiesDb = (notion, database_id) => composeP([
  appendTo(HEADER),
  toDiscordMsg, 
  fetchNotionDb(notion, database_id)
])

module.exports = { bountiesDb }