const config = require('../config.json')
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const search = require('youtube-search')
const feedback = require('../feedback.js')

module.exports.run = async (bot, message, args) => {
  var options = {
    maxResults: 50,
    key: config.youtubeAPI,
    type: 'video'
  }
  let index = 1
  let query = ''
  if (!isNaN(args[0]) && args[1]) {
    index = args[0]
    if (index <= 0 || index >= 51) { index = 1 }
    query = args.slice(1).join(' ')
  } else { query = args.join(' ') }
  index = Math.floor(index)
  const answer = `Youtube me donne ça pour '${query}'\n`
  search(query, options, (err, res) => {
    if (err) {
      console.log(`index = ${index}, response = ${res}`)
      console.error(err)
    }
    const video = res[index - 1]
    const response = answer + video.link
    message.channel.send(response)
    .then(sentAnswer => { feedback.isResultAccurate(bot, sentAnswer, message.author) })
    .catch(console.error)
  })
}

module.exports.help = {
  name: 'youtube',
  description: 'pff vraiment, une description pour cette commande aussi ? assisté/10... Ca envoie la premiere vidéo de ta recherche',
  examples: 'stp youtube kawaii compilation'
}
