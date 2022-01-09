const { getProposals } = require('../snapshot.js');

function replyToWith(trigger, response) {
    return (message) => {
        if (message.content === trigger)
            message.reply({ content: response }) 
    }
}
  
const format = ({title, id}) => `🗳 ${title}\nhttps://snapshot.org/#/krausehouse.eth/proposal/${id}`;
const proposals = async () => {
    const proposals = await getProposals();
    const head = `----------------------------------------------------------------------------------------\n**LIVE PROPOSALS**\n`
    const formatted = [head, ...proposals.map(format)];
    const content = formatted.join(`\n\n`);
    return content;
}

module.exports = {
    replyToWith,
    proposals
}