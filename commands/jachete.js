/* eslint-disable no-console */
const Discord = require('discord.js')
const mysql = require('mysql')
const config = require('../config.json')

var con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
})

con.connect(err => {
  if (err) { throw err }
  console.log('Connected to database.')
})

module.exports.run = async (bot, message, args) => {
  message.reply('désolé le shop est fermé pour la semaine (et peut etre plus mdr)')
}

module.exports.help = {
  name: 'jachete',
  description: 'Tu veux acheter un bail ?',
  examples: 'stp jachete'
}
