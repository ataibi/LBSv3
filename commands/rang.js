const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let level = 1
  const xpPool = {}
  xpPool[1] = 1234
  const totalXp = {}
  totalXp[1] = 1234
  while (level < 30) {
    level++
    xpPool[level] = xpPool[level - 1] * 1.5
    totalXp[level] = xpPool[level] + totalXp[level - 1]
  }
  const rangCard = new Discord.RichEmbed()
    .setTitle('__**LES RANGS DE LA CERTITUDE**__')
    .setColor('0CA170')
    .addField('__Judas :__', `De **0** à **${parseInt(totalXp[5]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points certitude.`)
    .addField('__Gars Patibulaire :__', `De **${parseInt(totalXp[5]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[10]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Perfide :__', `De **${parseInt(totalXp[10]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[15]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Incertain :__', `De **${parseInt(totalXp[15]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[20]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Solide :__', `De **${parseInt(totalXp[20]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** à **${parseInt(totalXp[25]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
    .addField('__Gars Sûr :__', `À partir de **${parseInt(totalXp[25]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}** points de certitude.`)
  message.channel.send(rangCard)
}

module.exports.help = {
  name: 'rang',
  description: 'liste tous les rangs',
  examples: 'stp rang'
}
