// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  await bot.player.resume(message)
  return message.channel.send("Et c'est reparti !!")
}

module.exports.help = {
  name: 'play',
  description: 'Reprend la lecture',
  examples: 'stp play',
  category: 'musique'
}
