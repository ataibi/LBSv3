// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const date = new Date()
  const day = date.getDay()
  if (day === 1) {
    return message.channel.send('Today is monday 😴', {
      files: [{
        attachment: './images/monday.jpg',
        name: 'monday.jpg'
      }]
    })
  } else if (day === 3) {
    return message.channel.send("It's wednesday my dudes" + message.client.emojis.get('410832474382401546'), {
      files: [{
        attachment: './images/wednesday.jpg',
        name: 'wednesday.jpg'
      }]
    })
  } else if (day === 4) {
    return message.channel.send('Jeudi Ok is on the way' + message.client.emojis.get('408104603029078023'), {
      files: [{
        attachment: './images/jeudiOK.jpg',
        name: 'jeudiOK.jpg'
      }]
    })
  } else if (day === 5) {
    return message.channel.send('Nous sommes vendredi', {
      files: [{
        attachment: './images/vendredi.mp4',
        name: 'vendredi.mp4'
      }]
    })
  } else {
    return message.channel.send("It's not wednesday my friends.", {
      files: [{
        attachment: './images/otherday.jpg',
        name: 'otherday.jpg'
      }]
    })
  }
}

module.exports.help = {
  name: 'date',
  description: 'Donne le jour de la semaine sous une forme originale',
  examples: ['stp date'],
  category: 'meme'
}
