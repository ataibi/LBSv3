const Discord = require('discord.js')
const Users = require('../users.js')

function formatDate(date) {
  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()
  return day + '/' + (++monthIndex) + '/' + year
}

const userCard = (userProfile, target) => {
  let level = userProfile.level
  let rank
  let prestige
  if (level <= 10) {
    color = '#FFC71E'
    if (level <= 5) { rank = 'Judas' } else { rank = 'Gars Patibulaire' }
  } else if (level > 10 && level <= 20) {
    color = 'E82C0C'
    if (level <= 15) { rank = 'Gars Perfide' } else { rank = 'Gars Incertain' }
  } else if (level > 20) {
    color = 'AD001D'
    if (level <= 25) { rank = 'Gars Solide' } else { rank = 'Gars Sûr' }
  }
  if (level > 30) { level = 30 }
  switch (level % 5) {
    case 0:
      prestige = ' **V**'
      break
    case 1:
      prestige = ' **I**'
      break
    case 2:
      prestige = ' **II**'
      break
    case 3:
      prestige = ' **III**'
      break
    case 4:
      prestige = ' **IV**'
      break
    default:
      prestige = ''
  }
  let xpCard = new Discord.RichEmbed()
        .setThumbnail(target.avatarURL)
        .setTitle(target.username)
        .addField('Points de certitude :', `${userProfile.experience}/${userProfile.experienceCap}`)
        .addField('Rang :', `${rank} ${prestige} (niveau ${userProfile.level})`)
        .addField('Certithunes :', userProfile.money)
        .setColor(color)
  return xpCard
}

module.exports.run = async (bot, message, args) => {
  let cleanArg = 0
  if (args[0] !== undefined) { cleanArg = args[0].replace(/\D/g, '') }
  const target = (cleanArg !== 0 && message.guild.members.find(member => member.id === cleanArg) !== undefined) ? message.guild.members.find(member => member.id === cleanArg).user : message.author

  let color
  let rank
  let prestige
  if (target.bot && target !== bot.user) { return message.reply("Même s'ils sont lourds, les bots sont incertains ma gueule (sauf moi bien sûr, t'as cru j'étais qui?)") } else if (target === bot.user) {
    rank = 'Bot Sûr'
    prestige = ' **V**'
    color = 'AD001D'
    const xpCard = new Discord.RichEmbed()
      .setThumbnail(bot.user.avatarURL)
      .setTitle(bot.user.username)
      .addField('Points de certitude :', '**∞**')
      .addField('Points requis pour le rang suivant :', 'Tu peux pas faire plus sûr')
      .addField('Rang :', rank + prestige)
      .setColor(color)
    return message.channel.send(xpCard)
  }

  Users.getUser(target, message.guild, (err, userProfile) => {
    if (err) {
      console.log(err)
      return message.channel.send(`${target.username} est absolument incertain.. je serais toi je lui parlerais pas `)
    }
    message.channel.send(userCard(userProfile, target))
  })
}
module.exports.help = {
  name: 'certitude',
  description: 'Ouais parce que mon dev savait pas quoi faire alors il a mis un systeme d\'experience en place',
  examples: 'stp certitude, stp certitude @user#1234'
}
