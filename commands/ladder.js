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
  console.log('\x1b[32m[\u2713] \x1b[0m\x1b[34m%s\x1b[0m', `connected to database from ladder command. `)
})

module.exports.run = async (bot, message, args) => {
  let maxNumber
  if (!(maxNumber = parseInt(args[0]))) { maxNumber = 24 }
  con.query(`SELECT * FROM users WHERE guild = ${message.guild.id} ORDER BY experience DESC`, (err, userList) => {
    if (err) console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err)
    if (userList[0] && userList.length > 1 && userList.length < 25) {
      const ladder = new Discord.MessageEmbed()
        .setTitle(`Classement de certitude chez \`${message.guild.name}\``)
        .setColor('GOLD')
      let position = 0
      let user
      while (userList[position] && position < maxNumber) {
        let user = message.guild.members.cache.get(userList[position].userID)
        ladder.addField(`__**#${position + 1} : ${user ? user.displayName : "Perdu dans l'incertitude"}**__`, `_${userList[position].experience} points de certitude.(${userList[position].money} certithunes)_`)
        position++
      }
      message.channel.send(ladder)
    }
  })
}

module.exports.help = {
  name: 'top',
  description: 'liste les n personnes les plus certaines du serveur (liste tous les utilisateurs par defaut)',
  examples: 'stp top 10, stp top',
  category: 'streetlife'
}
