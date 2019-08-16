/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
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
  const donor = message.author.id
  const target = message.mentions.users.first() || message.guild.members.get(args[0])
  let sql
  let total

  if (!target) { return message.reply("tu veux donner à qui ? j'ai pas compris..") }
  if (!args[1]) { return message.reply("tu sais que tu dois donner un montant aussi, j'suis pas devin.. J'en ai maaaaarre de vos conneries les gars !") }
  if (target.bot) { return message.reply("tu peux pas donner de certithunes aux bots. T'es teubé j'crois") }
  if (target === message.author) { return message.reply("j'crois que t'as pas compris ce que veut dire \"donner\", tu peux pas te donner quelque chose..") }
  con.query(`SELECT * FROM certithunes WHERE id = '${donor}' AND guild = '${message.guild.id}'`, (mError, donorRows) => {
    if (mError) { throw mError }
    if (!donorRows[0] || parseFloat(donorRows[0].amount) < parseFloat(args[1])) { return message.reply("t'as pas assez de thunes.. va plutot faire la manche sale clodo") }
    if (parseFloat(args[1]) < 0) { return message.reply("mdr t'es un pd on peut pas prendre de l'argent à quelqu'un comme ça, on est dans la certitude ici, pas dans une société capitaliste") }
    con.query(`SELECT * FROM certithunes WHERE id = '${target.id}' AND guild = '${message.guild.id}'`, (err, targetRows) => {
      if (err) { throw err }
      if (!targetRows[0]) {
        total = parseFloat(args[1])
        sql = `INSERT INTO certithunes (id, amount, guild) values ('${target.id}', '${total}', '${message.guild.id}')`
      } else {
        total = parseFloat(parseFloat(targetRows[0].amount) + parseFloat(args[1]))
        sql = `UPDATE certithunes SET amount = ${total} WHERE id = '${target.id}' AND guild = '${message.guild.id}'`
      }
      const sql2 = `UPDATE certithunes SET amount = ${parseFloat(parseFloat(donorRows[0].amount) - parseFloat(args[1]))} WHERE id = '${donor}' AND guild = '${message.guild.id}'`
      con.query(sql, (e, giving) => {
        if (e) { throw e } else { console.log(giving) }
        con.query(sql2, (trerror, transfert) => {
          if (trerror) { throw trerror } else { console.log(transfert) }
        })
        let currency = 'certithunes'
        if (parseFloat(args[1]) < 1) { currency = 'certicentimes' }
        return message.channel.send(`${message.author} vient de donner ${args[1]} ${currency} à ${target}. (si vous voulez mon avis, ça sent le suçage de bite)`)
      })
    })
  })
}

module.exports.help = {
  name: 'donne',
  description: 'Donne des certithunes à quelqu\'un',
  examples: 'stp donne @user#1234 X'
}
