// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const song = await bot.player.nowPlaying(message)
  if (song) {
    const progressBar = await bot.player.createProgressBar(message, {
      size: 30,
      block: '=',
      arrow: '>'
    })
    const embedVar = new Discord.MessageEmbed()
      .setTitle(`🎵 **${song.name}** 🎵`)
      .addField('Progrès :', progressBar.replace(/\s/g, '-') || 'je sais pas mdr')
      .setThumbnail(song.thumbnail)
      .setColor('DARK_RED')
      .setURL(song.url)
      .setAuthor(`${message.author.tag}`)
    message.channel.send({ embed: embedVar })
  }
}

module.exports.help = {
  name: 'song',
  description: 'Affiche la musique en cours et la musique suivante',
  examples: 'stp song',
  category: 'musique'
}
