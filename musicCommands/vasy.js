// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let botIsConnected = bot.voice.connections.get(message.guild.id)
    if (!botIsConnected ) {
        message.reply("j'suis pas co ma gueule")
    } else if (botIsConnected && botIsConnected.channel !== message.member.voice.channel) {
        return message.reply("faut venir dans mon chan vocal, j'suis posé je bouge **pas**.")
    } else if (botIsConnected.dispatcher && botIsConnected.dispatcher.paused) {
        botIsConnected.dispatcher.resume()
    } else {
        if (botIsConnected.dispatcher)
            return message.reply("J'suis pas en pause pd")
    }
}

module.exports.help = {
  name: 'play',
  description: 'Reprend la lecture',
  examples: 'stp play'
}
