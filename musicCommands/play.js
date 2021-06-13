// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (bot.player.isPlaying(message)) {
    await bot.player.addToQueue(message, {
      search: args.join(' '),
      requestedBy: message.author.tag
    })
  } else {
    const song = await bot.player.play(message, {
      search: args.join(' '),
      requestedBy: message.author.tag
    })
    if (song) {
      const embedVar = new Discord.MessageEmbed()
        .setTitle(`🎵 **${song.name}** 🎵`)
        .addField('Durée :', song.duration)
        .setThumbnail(song.thumbnail)
        .setColor('DARK_RED')
        .setURL(song.url)
        .setAuthor(`${message.author.tag}`)
      message.channel.send({ embed: embedVar })
    }
  }
}

module.exports.help = {
  name: 'met',
  description: 'Met de la musique dans ta vie ! On adore ça',
  examples: 'stp met https://www.youtube.com/watch?v=Y3etG4ng',
  category: 'musique'
}
