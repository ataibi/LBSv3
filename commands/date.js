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
    return message.channel.send("It's wednesday my dudes", {
      files: [{
        attachment: './images/wednesday.jpg',
        name: 'wednesday.jpg'
      }]
    })
  } else if (day === 4) {
    return message.channel.send('Jeudi Ok is on the way', {
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
  } else if (day === 0) {
    return message.channel.send("Aujourd'hui c'est dimanche, comme chaque dimanche", {
      files: [{
        attachment: './images/dimanche.mp4',
        name: 'dimanche.mp4'
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
