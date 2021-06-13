// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    args[0] = ' '
  }
  if (!bot.player.isPlaying() || !bot.player.getQueue(message)) { return message.reply("alors toi t'es vraiment une sacrée merde... je suis pas connecté au vocal, y'a pas de queue, et tu veux que je tourne en boucle... C'EST TA GRAND MERE QUI VA TOURNER EN BOUCLE SALE CHIEN mdr pardon ok désolé je m'excuse") }
  if (args[0] === 'plus' || args[0] === 'stop') {
    await bot.player.setQueueRepeatMode(message, false)
    await bot.player.setRepeatMode(message, false)
    return message.reply("ok j'arrete la loop !")
  } else if (args[0] === 'this' || args[0] === 'ca' || args[0] === 'it' || args[0] === 'ça' || args[0] === 'song') {
    console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} : `, `Looped song. Requested by ${message.author.tag}`)
    await bot.player.setRepeatMode(message, true)
    return message.reply("j'avoue bon son sa mère, DISCOOORD FM !!!!!!!!!!!!!!")
  } else if (args[0] === 'tout' || args[0] === 'all' || args[0] === 'playlist' || args[0] === 'queue') {
    console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} : `, `Looped playlist. Requested by ${message.author.tag}`)
    await bot.player.setQueueRepeatMode(message, true)
    return message.channel.send("ET C'EST PARTI ! ON VA TOURNER EN BOUCLE JUSQU'AU BOUT DE LA NUIT")
  } else {
    console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} : `, `Default looped playlist. Requested by ${message.author.tag}`)
    await bot.player.setQueueRepeatMode(message, true)
    return message.channel.send("j'suis pas sur d'avoir bien compris mais dans le doute j'ai tout mis en boucle !")
  }
}

module.exports.help = {
  name: 'loop',
  description: 'boucle les sons',
  examples: 'stp loop ca/this/it/ça/song (pour le son actuel), stp loop tout/all/playlist/queue (pour la playlist), stp loop plus/stop(pour arreter)',
  category: 'musique'
}
