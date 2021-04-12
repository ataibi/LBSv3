// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  return message.channel.send("J'approuve ton message", {
    files: [{
      attachment: './images/approve.jpg',
      name: 'approve.jpg'
    }] 
  })
}

module.exports.help = {
  name: 'support',
  description: 'Approuve ton message.',
  examples: 'stp support',
  category: 'ponctuation'
}
