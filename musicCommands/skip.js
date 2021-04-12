// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const music = require('../music.js')

module.exports.run = async (bot, message, args, queue) => {
    guildId = message.guild.id
    let botIsConnected = bot.voice.connections.get(message.guild.id)
    if (botIsConnected) {
        botIsConnected.dispatcher.end()
    } else {
        message.reply("j'suis pas co ma gueule")
    }
}

module.exports.help = {
  name: 'next',
  description: 'lourd',
  examples: 'lourd',
  category: 'musique'
}
