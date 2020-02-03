// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    let botIsConnected = bot.voiceConnections.get(message.guild.id)
    let minutes = 00
    let secondes = 00
    if (botIsConnected) {
        progress = parseInt(botIsConnected.dispatcher.time / 1000)
        minutes = Math.floor(progress / 60)
        secondes = parseInt(progress % 60)
    }
    if (queue.guildId) {
        let queueMessage = '```'
        let index = 1
        queue.guildId.forEach(video => {
            queueMessage += `${index} : ${video.title}`
            queueMessage += video.np ? ` ▶(lecture en cours)◀ ${minutes}:${secondes}/${Math.floor(video.duration / 60)}:${parseInt(video.duration % 60)}\n` : '\n'
            index++
        })
        queueMessage += '```'
        message.channel.send(queueMessage)
    } else {
        message.reply('rajoute des sons pour avoir une GROSSE QUEUE SA MERE MDR LOL XD')
    }
}

module.exports.help = {
    name: 'queue',
    description: 'Affiche la liste de lecture en cours',
    examples: 'stp queue'
  }
  
