// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  await bot.player.skip(message)
}

module.exports.help = {
  name: 'next',
  description: 'lourd',
  examples: 'lourd',
  category: 'musique'
}
