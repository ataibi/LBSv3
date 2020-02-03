// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let botIsConnected = bot.voiceConnections.get(message.guild.id)
    if (botIsConnected) {
        botIsConnected.dispatcher.end('skip')
    } else {
        message.reply("j'suis pas co ma gueule")
    }
}

module.exports.help = {
  name: 'next',
  description: 'lourd',
  examples: 'lourd'
}
