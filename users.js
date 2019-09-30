/* eslint-disable no-console */
const Discord = require('discord.js')
const mysql = require('mysql')
const config = require('./config.json')

var con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
})

const levelUpCard = (newLevel, message) => {
  let color
  let rank
  let prestige
  if (newLevel <= 10) {
    color = '#FFC71E'
    if (newLevel <= 5) { rank = 'Judas' } else { rank = 'Gars Patibulaire' }
  } else if (newLevel > 10 && newLevel <= 20) {
    color = 'E82C0C'
    if (newLevel <= 15) { rank = 'Gars Perfide' } else { rank = 'Gars Incertain' }
  } else if (newLevel > 20) {
    color = 'AD001D'
    if (newLevel <= 25) { rank = 'Gars Solide' } else { rank = 'Gars Sûr' }
  }
  if (newLevel > 30) { newLevel = 30 }
  switch (newLevel % 5) {
    case 0:
      prestige = ' **V**'
      break
    case 1:
      prestige = ' **I**'
      break
    case 2:
      prestige = ' **II**'
      break
    case 3:
      prestige = ' **III**'
      break
    case 4:
      prestige = ' **IV**'
      break
    default:
      prestige = ''
  }
  return new Discord.RichEmbed()
    .setThumbnail(message.author.avatarURL)
    .setTitle(`${message.author.username} vient de gagner en certitude !`)
    .addField('Rang : ', rank + prestige)
    .setColor(color)
}

module.exports.getUser = (user, guild, callback) => {
  con.query(`SELECT * FROM users WHERE userID = '${user.id}' AND guild = '${guild.id}'`, (err, res) => {
    if (err) {
      console.log(err)
      callback(err, 0)
    } else if (res[0]) {
      callback(0, res[0])
    } else {
      callback(1, 0)
    }
  })
}

module.exports.increaseLevel = (newLevel, message) => {
  if (newLevel === 26) return
  con.query(`SELECT * FROM experiencetolevel WHERE level = ${newLevel}`, (err, newCap) => {
    if (err) return console.log(err)
    con.query(`UPDATE users SET level = '${newLevel}', experienceCap = '${newCap[0].experience}' WHERE userID = ${message.author.id} AND guild = ${message.guild.id}`, (e) => {
      if (e) return console.log(e)
    })
  })
}

module.exports.createUser = (userID, guild, experience, money) => {
  const timeNow = parseInt(Date.now())
  con.query(`INSERT INTO users(userID, guild, experience, lastExperience, money, lastMoney) VALUES('${userID}', '${guild}', '${experience}', ${timeNow}, '${money}', '${timeNow}')`, (err) => {
    if (err) return console.log(err)
    return console.log('successfully created user profile')
  })
}

module.exports.addXP = (message, min, max, cmd) => {
  if (message.author.bot)
    return 0
  let experience = Math.floor(Math.random() * (max - min)) + min
  const now = new Date()
  const today = now.getDay()
  const timeNow = parseInt(Date.now())

  if (today === 4) {
    experience += experience
    console.log('jeudi certain, double XP')
  }
  module.exports.getUser(message.author, message.guild, (err, userProfile) => {
    if (err) {
      return module.exports.createUser(message.author.id, message.guild.id, experience, 0.00)
    }
    if (parseInt(userProfile.lastExperience) + 6000 >= Date.now() && cmd === 1) {
      return console.log(`${message.author.tag} gained xp too recently`)
    }
    if (userProfile.experience + experience >= userProfile.experienceCap) {
      module.exports.increaseLevel(userProfile.level + 1, message)
      message.channel.send(levelUpCard(userProfile.level + 1, message))
    }
    con.query(`UPDATE users SET experience = ${userProfile.experience + experience}, lastExperience = '${timeNow}' WHERE userID = '${message.author.id}' AND guild = '${message.guild.id}'`, (error) => {
      if (error) console.log(error)
      console.log(`gave xp to ${message.author.tag}`)
    })
  })
}