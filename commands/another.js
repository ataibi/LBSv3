// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let i = 0
  let msg = ''
  message.mentions.users.forEach(user => {
    if (i > 0) { msg += ', ' }
    msg += '<@' + user.id + '>'
    i++
  })
  if (i > 0) {
    return message.channel.send(msg + ', you played yourself', {
      files: [{
        attachment:'./images/another.gif',
        name: 'another.gif'
      }] 
    })
  } else {
    return message.channel.send('Another one.', {
      files: [{
        attachment:'./images/anotherone.gif',
        name: 'anotherone.gif'
      }] 
    })
  }
}

module.exports.help = {
  name: 'another',
  description: 'Another one.',
  examples: ['stp another @user#1234', 'stp another'],
  category: 'meme'
}
