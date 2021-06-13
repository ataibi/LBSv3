// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  await bot.player.pause(message)
  return message.channel.send("Une petite pause s'impose..")
}

module.exports.help = {
  name: 'pause',
  description: 'pause la lecture de la musique',
  examples: 'stp pause',
  category: 'musique'
}
