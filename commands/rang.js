const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let level = 1
    const totalXp = {}
    totalXp[1] = 600
  while (level < 31)
  {
      totalXp[level + 1] = Math.floor(((Math.exp(Math.log(level) * 0.5) * 1200) + (Math.exp(Math.log(level - 1) * 0.5) * 1200)) + totalXp[level])
      level++;
  }
  const rangCard = new Discord.MessageEmbed()
    .setTitle('__**LES RANGS DE LA CERTITUDE**__')
    .setColor('0CA170')
    .addField('__Judas :__', `De **0** à **${parseInt(totalXp[6]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points certitude.`)
    .addField('__Gars Patibulaire :__', `De **${parseInt(totalXp[6]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[11]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Perfide :__', `De **${parseInt(totalXp[11]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[16]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Incertain :__', `De **${parseInt(totalXp[16]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[21]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Solide :__', `De **${parseInt(totalXp[21]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[25]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Sûr :__', `À partir de **${parseInt(totalXp[25]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
  message.channel.send(rangCard)
}

module.exports.help = {
  name: 'rang',
  description: 'liste tous les rangs',
  examples: 'stp rang',
  category: 'streetlife'
}
