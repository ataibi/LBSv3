// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const isDone = await bot.player.setVolume(message, parseInt(args[0]))
  if (isDone) {
    message.channel.send(`Le volume a été mis à ${args[0]}%`)
  }
}

module.exports.help = {
  name: 'volume',
  description: 'met le volume a un certain pourcentage (max 200)',
  examples: 'stp volume 99, stp volume 5',
  category: 'musique'
}
