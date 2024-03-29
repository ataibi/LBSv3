/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const mysql = require('mysql')
const config = require('../config.json')
const Users = require('../users.js')

var con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
})

//const alreadyAsked = ['']

module.exports.run = async (bot, message, args) => {
  if (message.author.bot)
    return 0
  const now = new Date()
  let today = now.getDay()

  Users.getUser(message.author, message.guild, (err, userProfile) => {
    if (err) {
      return Users.createUser(message.author.id, message.guild.id, 0, money)
    }

    let money = parseFloat(((Math.random() * 2) + 2) + userProfile.level).toFixed(2)
    let cooldown = new Date(parseInt(userProfile.lastMoney))
    const timeNow = parseInt(Date.now())

    if (today === 4) { money = parseFloat(money * 2).toFixed(2) } else { console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `regular day, no money bonus for ${message.author.tag}`) }
    
    if (now.setHours(0, 0, 0, 0) === cooldown.setHours(0, 0, 0, 0)) {
      message.reply(`tu fais pitié à réclamer de l'argent comme une roumaine dans le metro`)// random from alreadyAsked array
      return console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `${message.author.tag} gained money today`)
    }
    const total = parseFloat(parseFloat(userProfile.money) + parseFloat(money))
    con.query(`UPDATE users SET money = ${total}, lastMoney = '${timeNow}' WHERE userID = '${message.author.id}' AND guild = '${message.guild.id}'`, (error) => {
      if (error) console.log(error)
      console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `gave ${money} certithunes to ${message.author.tag}`)
      message.reply(`tu viens de gagner ${parseFloat(money).toFixed(2)} certithunes ! Reviens demain ou suce ma bite`)
    })
  })
}

module.exports.help = {
    name: 'certithune',
    description: 'récupere ton pécule journalier maggle, faut bien se faire des certithunes',
    examples: 'stp certithune',
    category: 'streetlife'
  }
  
