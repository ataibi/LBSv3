// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const config = require('../config.json')
const giphy = require('giphy-api')(config.giphyAPI)

module.exports.run = async (bot, message, args) => {
  let index = 1
  let query = ''
  if (!isNaN(args[0]) && args[1]) {
    index = args[0]
    if (index <= 0 || index >= 100) { index = 1 }
    query = args.slice(1).join(' ')
  } else { query = args.join(' ') }
  index = Math.floor(index)
  const answer = `voilà ce que me donne giphy pour '${query}'\n`
  giphy.search({ q: query, limit: 100 }, (err, res) => {
    if (err) { throw err }
    const gif = res.data[index]
    const response = answer + gif.url
    message.channel.send(response)
    .then(sentAnswer => { feedback.isResultAccurate(bot, sentAnswer, message.author) })
    .catch(console.error)
  })
}

module.exports.help = {
  name: 'gif',
  description: 'bah je cherche un gif sur internet, t\'as vraiment besoin d\'une description pour ça ?',
  examples: 'stp gif I\'m swinging'
}
