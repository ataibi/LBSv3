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

module.exports.run = async (bot, message, args) => {
  const target = message.mentions.users.first() || message.guild.members.get(args[0])
  let gift = parseFloat(args[1])

  if (!gift) { return message.reply("faut donner un chiffre sale merde") }
  if (!target) { return message.reply("tu veux donner à qui ? j'ai pas compris..") }
  if (!args[1]) { return message.reply("tu sais que tu dois donner un montant aussi, j'suis pas devin.. J'en ai maaaaarre de vos conneries les gars !") }
  if (target.bot) { return message.reply("tu peux pas donner de certithunes aux bots. T'es teubé j'crois") }
  if (target === message.author) { return message.reply("j'crois que t'as pas compris ce que veut dire \"donner\", tu peux pas te donner quelque chose..") }

  Users.getUser(message.author, message.guild, (err, donorProfile) => {
    if (err) {
      return message.reply("T'as pas d'argent et tu veux en donner ? mdr casse toi")
    }
    if (donorProfile.money < gift) {
      return message.reply(" t'es trop pauvre ah tu me dégoutes casse toi")
    }
    if (gift < 0) {
      return message.reply("DONNER ! D O N N E R ça veut dire du positif, sinon c'est PRENDRE")
    }
    Users.getUser(target, message.guild, (error, targetProfile) => {
      if (error) {
        con.query(`UPDATE users SET money = '${parseFloat(parseFloat(donorProfile.money) - parseFloat(gift))}' WHERE userID = '${donorProfile.userID}' AND guild = '${donorProfile.guild}'`, (e) => {
          if (e) { 
            console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, e)
            return message.reply('désolé il y a eu un soucis..')
          }
          Users.createUser(target.id, message.guild.id, 0, gift)
        })
      }
      con.query(`UPDATE users SET money = '${parseFloat(parseFloat(donorProfile.money) - parseFloat(gift))}' WHERE userID = '${donorProfile.userID}' AND guild = '${donorProfile.guild}'`, (e) => {
        if (e) { 
          console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, e)
          return message.reply('désolé il y a eu un soucis..')
        }
        con.query(`UPDATE users SET money = '${parseFloat(parseFloat(targetProfile.money) + parseFloat(gift))}' WHERE userID = '${targetProfile.userID}' AND guild = '${targetProfile.guild}'`, (er) => {
          if (er) {
            console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, er)
            return message.reply('désolé il y a eu un soucis..')
          }
          return message.channel.send(`Oof, ça ressemble à un annulingus ça ! ${message.author} vient de donner ${gift} certithunes à ${target}`)
        })
      })
    })
  })
}

module.exports.help = {
  name: 'donne',
  description: 'Donne des certithunes à quelqu\'un',
  examples: 'stp donne @user#1234 X',
  category: 'streetlife'
}
