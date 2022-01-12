const { Client: NotionClient } = require("@notionhq/client")
const { notionKey, proposals_db_id, bounties_db_id } = require('../../config')

const { bountiesDb } = require('./bountiesDb');
const { proposalDbUpdate } = require('./proposalsDb');

// Initializing a client
const notion = new NotionClient({
  auth: notionKey,
})

module.exports = {
    proposalDbUpdate: proposalDbUpdate(notion, proposals_db_id),
    bountiesDb: bountiesDb(notion, bounties_db_id)
}