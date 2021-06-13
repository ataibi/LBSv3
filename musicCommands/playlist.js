// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  await bot.player.playlist(message, {
    search: args.join(' '),
    maxSongs: 50
  })
}

module.exports.help = {
  name: 'playlist',
  description: 'rajoute une playlist youtube a la suite de la liste de lecture actuelle',
  examples: 'stp playlist https://www.youtube.com/playlist?list=PLw-VjHDlEOgs6-KNB6I3xb6M2WfeH35mm',
  category: 'musique'
}
