const config = require('../config.json')
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const search = require('youtube-search')

module.exports.run = async (bot, message, args) => {
  var options = {
    maxResults: 1,
    key: config.googleAPI,
    type: 'video'
  }
  let index = 0
  let query = ''
  if (!isNaN(args[0]) && args[1]) {
    index = args[0]
    if (index <= 0 || index >= 100) { index = 0 }
    query = args.slice(1).join(' ')
  } else { index = 0 }
  const answer = `Youtube me donne ça pour '${query}'\n`
  search(query, options, (err, res) => {
    if (err) { throw err }
    const video = res[index]
    return message.reply(answer + video.link)
  })
}

module.exports.help = {
  name: 'youtube',
  description: 'pff vraiment, une description pour cette commande aussi ? assisté/10... Ca envoie la premiere vidéo de ta recherche',
  examples: 'stp youtube kawaii compilation'
}
