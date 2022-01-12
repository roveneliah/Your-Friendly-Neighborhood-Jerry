const { getProposals } = require('../../api/snapshot.js');
const { len } = require('../notion/functions.js');

const format = ({title, id}) => `🗳 ${title}\nhttps://snapshot.org/#/krausehouse.eth/proposal/${id}`;
const proposals = async () => {
    const proposals = await getProposals();
    if (!len(proposals)) return null;
    const head = `----------------------------------------------------------------------------------------\n**LIVE PROPOSALS**\n`
    const formatted = [head, ...proposals.map(format)];
    const content = formatted.join(`\n\n`);
    return content;
}

module.exports = {
    proposals
}