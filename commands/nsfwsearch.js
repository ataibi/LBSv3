const Discord = require('discord.js')
const Pornsearch = require('pornsearch')
const feedback = require('../feedback.js')

module.exports.run = async (bot, message, args) => {
  const Searcher = new Pornsearch(args, 'pornhub')
  Searcher.videos()
    .then(videos => {
      const response = new Discord.MessageEmbed()
        .setTitle(videos[1].title.replace(/\s+/g, ' ').trim())
        .setThumbnail(videos[1].thumb)
        .addField('Duration :', videos[1].duration)
        .setURL(videos[1].url)
        .setColor('#FF9900')
      message.channel.send(response)
      .then(sentAnswer => { feedback.isResultAccurate(bot, sentAnswer, message.author) })
      .catch(console.error)
      console.log(videos[1])
    })
}

module.exports.help = {
  name: 'porn',
  description: 'on se met bien, cherche du porn oklm entre potes',
  examples: 'stp porn midget furry fucks Bob Razowski'
}
