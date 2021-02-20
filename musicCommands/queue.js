// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    console.log(queue)
    let botIsConnected = bot.voice.connections.get(message.guild.id)
    let minutes = 00
    let secondes = 00
    if (botIsConnected && botIsConnected.dispatcher) {
        progress = parseInt(botIsConnected.dispatcher.streamTime / 1000)
        minutes = Math.floor(progress / 60)
        secondes = parseInt(progress % 60)
    }
    if (queue.guildId) {
        let queueMessage = '```'
        let index = 1
        queue.guildId.forEach(video => {
            durMin = Math.floor(video.duration / 60)
            durSec = parseInt(video.duration % 60)
            queueMessage += `${index} : ${video.title}`
            queueMessage += video.np ? ` ▶(lecture en cours)◀ ${minutes < 10 ? '0' + minutes : minutes}:${secondes < 10 ? '0' + secondes : secondes}/${durMin < 10 ? '0' + durMin : durMin}:${durSec < 10 ? '0' + durSec : durSec}\n` : '\n'
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
  
