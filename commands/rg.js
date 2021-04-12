/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const config = require('../config.json')
const ImageSearch = require('image-search-google')
const feedback = require('../feedback.js')

const engine = new ImageSearch(config.engineID, config.googleAPI)

module.exports.run = async (bot, message, args) => {
  let index = 1
  let query = ''
  let pageNumber = 1
  if (!isNaN(args[0]) && args[1]) {
    index = args[0]
    if (index <= 0 || index >= 100) { index = 1 }
    query = args.slice(1).join(' ')
    while (index > 10) {
      index = index - 10
      pageNumber += 10
    }
  } else { query = args.join(' ') }
  index = Math.floor(index)
  engine.search(query, { page: pageNumber })
    .then(images => {
      const response = `Google Images me donne ça pour '${query}'\n${images[index - 1].url}`
      message.channel.send(response)
      .then(sentAnswer => { feedback.isResultAccurate(bot, sentAnswer, message.author) })
      .catch(console.error)
    }).catch(e => {
        console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, e)
        message.channel.send('désolé je trouve rien');
    })
}

module.exports.help = {
  name: 'rg',
  description: '\'rg\' pour recherche google, ça envoie le premier resultat de la recherche d\'images',
  examples: 'stp rg voiture',
  category: 'utile'
}
