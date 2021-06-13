// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const queue = bot.player.getQueue(message)
  if (queue) {
    message.channel.send('Queue:\n' + (queue.songs.map((song, i) => {
      return `${i === 0 ? 'En ce moment' : `#${i + 1}`} - ${song.name} | ${song.author}`
    }).join('\n'))).catch(err => {
      console.error(err)
      message.channel.send('la queue est trop longue, bientot ce sera fix inchallah')
    })
  }
}

module.exports.help = {
  name: 'queue',
  description: 'Affiche la liste de lecture en cours',
  examples: 'stp queue',
  category: 'musique'
}
