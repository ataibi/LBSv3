/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.cache.find(role => role.name === 'LesGarsSûrs') && message.author.id !== bot.user.id) { return message.reply("mdr t'as cru j'allais répéter ce que tu voulais ? Si t'es pas un gars sûr tu vaux **rien** pour moi.") }
  const botmessage = args.join(' ')
  if (!args[0]) { return message.reply('tu veux me faire dire quelque chose mais tu me donnes rien à dire ? wtf dude') }
  message.delete({ timeout : 5, reason: 'stp dit'})
    .then(msg => console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} : `, `message deleted :  ${msg.cleanContent} (author : ${message.author.username})`))
    .catch(console.error)
  return message.channel.send(botmessage)
}

module.exports.help = {
  name: 'dit',
  description: 'repete après toi.(fonctions réservée aux gars sûrs ma gueule, j\'suis pas une victime)',
  examples: 'stp dit je suce des bites.',
  category: 'utile'
}
