const { map, compose, head, pick, prop, bold, printPass, nestedMapProp, italicize } = require("./functions");

const fetchNotionDb = async (notion, database_id) => (
    notion.databases.query({
      database_id
    })
)

const toDiscordMessage = ({ Name, Reward, Type, Contact, Description }) => 
`${bold(Name)} — ${italicize(Reward)}
${Description}
Reach out to @${Contact} to get started.`

const maybeProp = (propName, o) => o && o[propName]
const format = result => ({
    ...result,
    Name: maybeProp("plain_text", head(result.Name.title)),
    Reward: maybeProp("plain_text", head(result.Reward.rich_text)),
    Type: maybeProp("name", result.Type.select),
    Contact: maybeProp("name", head(result.Contact.multi_select)),
    Description: maybeProp("plain_text", head(result.Description.rich_text)),
})

const bountiesDb = (notion, database_id) => async () => {
  const header = 
`${bold("Bounty Board Daily Update")}
Looking to help out?  Here's a list of oppurtunities curated by our team leads.
You can add your own bounties to the board here: https://bit.ly/3FtoGsE\n\n`

  const messages = await fetchNotionDb(notion, database_id)
    .then(prop("results"))
    .then(map(({ url, properties }) => ({
        ...properties,
        url,
    })))
    .then(map(format))
    .then(map(toDiscordMessage))
    .then(msgs => msgs.join('\n\n'))

  return header + messages;
}

module.exports = { bountiesDb }