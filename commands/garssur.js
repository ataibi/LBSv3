// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let i = 0
  let me = 0
  let msg = ''
  const gs = message.guild.roles.cache.find(role => role.name === 'LesGarsSûrs')
  if (!gs) { return message.channel.send('Pas de role appelé "LesGarsSûrs" sur ce serveur, vous etes vraiment incertains !') }
  gs.members.forEach(gmember => {
    if (i > 0) { msg += ', ' }
    msg += '<@' + gmember.id + '>'
    i++
    if (gmember.id === bot.user.id) { me = 1 }
  })
  const emote = message.client.emojis.cache.get('410832474382401546')
  if (i === 1) { return message.channel.send(`${msg} est un gars sûr, avec moi quand même ${(emote || '')}`)} else if (i > 1 && me !== 1) { return message.channel.send(`${msg} sont des gars sûrs, et moi bien sûr ! ${(emote || '')}`)} else if (i > 1 && me === 1) { return message.channel.send(`${msg} sont des gars sûrs ! ${(emote || '')}`)} else { return message.channel.send(`Je suis la seule entité sûre du serveur, nous sommes dans l'incertitude la plus totale !!!${(emote || '')}`)}
}

module.exports.help = {
  name: 'gs',
  description: 'Mentionne tous les gars sûrs du serveur.',
  examples: ['stp gs'],
  category: 'utile'
}
