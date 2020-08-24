// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    let botIsConnected = bot.voiceConnections.get(message.guild.id)
    let minutes = 00
    let secondes = 00
    if (botIsConnected) {
        progress = parseInt(botIsConnected.dispatcher.time / 1000)
        minutes = Math.floor(progress / 60)
        secondes = parseInt(progress % 60)
    }
    if (queue.guildId) {
        let index = 0
        while (queue.guildId[index].np == 0) { index++ }
        let video = queue.guildId[index]
        const embed = new Discord.RichEmbed()
        .setTitle(`🎵 En cours : **${video.title}**`)
        .addField(`Durée :`, `**${minutes}:${parseInt(secondes) < 10 ? '0' + secondes : secondes}/${Math.floor(video.duration / 60)}:${parseInt(video.duration % 60) < 10 ? '0' + video.duration % 60 : video.duration % 60}**`)
        .addField('__Ajouté par :__', `**${video.addedBy}**`)
        .addField('__Suivant :__', `${queue.guildId[index + 1] ? queue.guildId[index + 1].title : 'Rien mdr'}`)
        .setThumbnail(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)
        .setColor('DARK_RED')
        message.channel.send(embed)
    } else {
        message.reply("Y'a rien en cours")
    }
}

module.exports.help = {
    name: 'song',
    description: 'Affiche la musique en cours et la musique suivante',
    examples: 'stp song'
  }
  
