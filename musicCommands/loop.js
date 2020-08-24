// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const music = require('../music.js')

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    let botIsConnected = bot.voiceConnections.get(guildId)

    if (!args[0]) {
        args[0] = ' '
    } else if (args[0] !== 'ça' && args[0] !== 'ca' && args[0] !== 'tout' && args[0] !== 'plus') { return message.reply('je sais pas ce que tu veux que je loop, tu peux dire "stp loop ça" ou "stp loop tout"') }
    if (!botIsConnected || !queue.guildId) { return message.reply("alors toi t'es vraiment une sacrée merde... je suis pas connecté au vocal, y'a pas de queue, et tu veux que je tourne en boucle... C'EST TA GRAND MERE QUI VA TOURNER EN BOUCLE SALE CHIEN mdr pardon ok désolé je m'excuse") }
    switch (args[0]) {
        case ('plus'|| 'stop'):
            console.log(`Stopped loop. Requested by ${message.author.tag}`)
            queue.guildId[0].loop = 'none'
            return message.reply("ok j'arrete la loop !")
            break;
        case ('this' || 'ca' || 'it' || 'ça' || 'song'):
            console.log(`Looped song. Requested by ${message.author.tag}`)
            queue.guildId[0].loop = 'song'
            return message.reply("j'avoue bon son sa mère, DISCOOORD FM !!!!!!!!!!!!!!")
            break;
        case ('tout' || 'all'|| 'playlist' || 'queue'):
            console.log(`Looped playlist. Requested by ${message.author.tag}`)
            queue.guildId[0].loop = 'all'
            return message.channel.send("ET C'EST PARTI ! ON VA TOURNER EN BOUCLE JUSQU'AU BOUT DE LA NUIT")
            break;
        default:
            console.log(`Default looped playlist. Requested by ${message.author.tag}`)
            queue.guildId[0].loop = 'all'
            return message.channel.send("ET C'EST PARTI ! ON VA TOURNER EN BOUCLE JUSQU'AU BOUT DE LA NUIT")
            break;
    }
}

module.exports.help = {
  name: 'loop',
  description: 'boucle les sons',
  examples: 'stp loop ça/ca/this/it/song (pour le son actuel), stp loop tout/all/playlist/queue (pour la playlist), stp loop plus/stop (pour arreter)'
}
