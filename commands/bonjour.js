// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  return message.reply('Coucou toi, ça va ?', {
    files: [{
      attachment: './images/bonjour.jpg',
      name: 'bonjour.jpg'
    }]
  })
}

module.exports.help = {
  name: 'bonjour',
  description: 'dit bonjour au bot batard!',
  examples: 'stp bonjour',
  category: 'politesse'
}
