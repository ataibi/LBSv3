const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const botembed = new Discord.MessageEmbed()
    .setDescription("Je suis le début et la fin, l'alpha et l'oméga, la certitude et l'incertitude, je suis tout et je ne suis rien, je suis... \n**LeBotSûr, version 2.1**")
    .setColor('#8D0F0B')
    .setThumbnail('http://sc.letscode.pw/tki.png')

  return message.channel.send(botembed)
}

module.exports.help = {
  name: 'tki',
  description: "Si tu sais pas qui j'suis",
  examples: 'stp tki',
  category: 'meta'
}
