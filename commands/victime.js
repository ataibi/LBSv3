// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const pls = bot.emojis.cache.find(emoji => emoji.name === 'pls')
  let i = 0
  let msg = ''
  message.mentions.users.forEach(user => {
    if (i > 0) { msg += ', ' }
    msg += '<@' + user.id + '>'
    i++
  })
  if (i > 0) { msg += ', ' }
  message.channel.send(`${msg} en ce moment <:pls:${pls.id}>\nça va oklm la PLS ?`)
}

module.exports.help = {
  name: 'victime',
  description: 'Quand y\'a une victime tu fais cette commande.',
  examples: 'stp victime, stp victime @user#1234',
  category: 'ponctuation'
}
