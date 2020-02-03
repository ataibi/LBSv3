// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let botIsConnected = bot.voiceConnections.get(message.guild.id)
    if (!botIsConnected ) {
        message.reply("j'suis pas co ma gueule")
    } else if (botIsConnected && botIsConnected.channel !== message.member.voiceChannel) {
        return message.reply("faut venir dans mon chan vocal, j'suis posé je bouge **pas**.")
    } else if (botIsConnected.dispatcher && !botIsConnected.dispatcher.paused) {
        botIsConnected.dispatcher.pause()
    } else {
        return message.reply("tu veux mettre quoi en pause ?..")
    }
}

module.exports.help = {
  name: 'pause',
  description: 'pause la lecture de la musique',
  examples: 'stp pause'
}
