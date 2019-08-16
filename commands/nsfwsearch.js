const Discord = require('discord.js')
const Pornsearch = require('pornsearch')

module.exports.run = async (bot, message, args) => {
  const Searcher = new Pornsearch(args, 'pornhub')
  Searcher.videos()
    .then(videos => {
      const lourdeVideo = new Discord.RichEmbed()
        .setTitle(videos[1].title)
        .setThumbnail(videos[1].thumb)
        .addField('Duration :', videos[1].duration)
        .setURL(videos[1].url)
        .setColor('#FF9900')
      message.channel.send(lourdeVideo)
      console.log(videos)
    })
}

module.exports.help = {
  name: 'porn',
  description: 'on se met bien, cherche du porn oklm entre potes',
  examples: 'stp porn midget furry fucks Bob Razowski'
}
