const axios = require('axios')
const uri = 'https://hub.snapshot.org/graphql'
const liveProposals = `query Proposals {
  proposals (
    first: 20,
    skip: 0,
    where: {
      space_in: ["krausehouse.eth", "tecommons.eth", "gitcoindao.eth", "banklessvault.eth"],
      state: "active",
    },
    orderBy: "created",
    orderDirection: asc
  ) {
    id
    title
    body
    # choices
    start
    # end
    # snapshot
    # state
    author
    # space {
    #   id
    #   name
    # }
  }
}`

const query = async (query) => {
  const x = await axios.post(uri, {query})
  .then(res => res.data.data.proposals)
  .catch(e => console.log(e))
  return x;
}

exports.getProposals = async () => await query(liveProposals);