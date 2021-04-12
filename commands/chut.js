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
    return message.channel.send(msg + ', shhhhhhhh', {
      files: [{
        attachment: './images/sh.jpg',
        name: 'sh.jpg'
      }] 
    })
  } else {
    return message.channel.send('SHHHH', {
      files: [{
        attachment: './images/sh.jpg',
        name: 'sh.jpg'
      }]
    })
  }
}

module.exports.help = {
  name: 'chut',
  description: 'Laisse toi faire.',
  examples: ['stp chut', 'stp chut @user#1234'],
  category: 'politesse'
}
