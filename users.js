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

const levelUpCard = (newLevel, member) => {
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
  return new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL)
    .setTitle(`${member.user.username} vient de gagner en certitude !`)
    .addField('Rang : ', rank + prestige)
    .setColor(color)
}

module.exports.getUser = (user, guild, callback) => {
  con.query(`SELECT * FROM users WHERE userID = '${user.id}' AND guild = '${guild.id}'`, (err, res) => {
    if (err) {
      console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err)
      callback(err, 0)
    } else if (res[0]) {
      callback(0, res[0])
    } else {
      callback(1, 0)
    }
  })
}

module.exports.increaseLevel = (newLevel, member) => {
  if (newLevel === 26) return
  con.query(`SELECT * FROM experiencetolevel WHERE level = ${newLevel}`, (err, newCap) => {
    if (err) return console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err)
    con.query(`UPDATE users SET level = '${newLevel}', experienceCap = '${newCap[0].experience}', username = '${member.user.username}' WHERE userID = ${member.id} AND guild = ${member.guild.id}`, (e) => {
      if (e) return console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, e)
    })
  })
}

module.exports.createUser = (userID, guild, experience, money, username) => {
  const timeNow = parseInt(Date.now())
  con.query(`INSERT INTO users(username, userID, guild, experience, lastExperience, money, lastMoney) VALUES('${username}', '${userID}', '${guild}', '${experience}', ${timeNow}, '${money}', '${money > 0 ? timeNow : 0}')`, (err) => {
    if (err) return console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err)
    return console.log(`successfully created user profile for ${username}`)
  })
}
module.exports.addVocalXP = (guild, min, max, cmd) => {
  let experience = Math.floor(Math.random() * (max - min)) + min
  const now = new Date()
  const today = now.getDay()

  if (today === 4) {
    experience += experience + experience
    // console.log('jeudi certain, triple vocal XP')
  }
  if (guild.voiceStates.cache.filter(voiceState => !voiceState.member.user.bot).size <= 1) {
    return console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `Not enough people in vocal chat to give XP`)
  }
  guild.voiceStates.cache.each(voiceState => {
    if (voiceState.member.user.bot) {
      return console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `${voiceState.member.nickname} is a bot and deserves no xp`)
    }
    if(!voiceState.channel) {
      return console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `${voiceState.member.nickname} is not actually connected`)
    }
    module.exports.getUser(voiceState.member, guild, (err, userProfile) => {
      if (err) {
        return module.exports.createUser(voiceState.member.id, guild.id, experience, 0.00, voiceState.member.user.username)
      }
      if (userProfile.experience + experience >= userProfile.experienceCap) {
        // console.log(voiceState.member)
        module.exports.increaseLevel(userProfile.level + 1, voiceState.member)
        guild.channels.cache.get('813025425353736192').send(levelUpCard(userProfile.level + 1, voiceState.member))
      }
      con.query(`UPDATE users SET experience = ${userProfile.experience + experience}, username = '${voiceState.member.user.username}' WHERE userID = '${voiceState.member.id}' AND guild = '${guild.id}'`, (error) => {
        if (error) console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, error)
        console.log('\x1b[41m%s\x1b[0m%s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `gave vocal xp to ${voiceState.member.nickname} because they are connected to ${voiceState.channel ? voiceState.channel.name : 'nothing'} on ${guild.name}<`)
      })
    })
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
  }
  module.exports.getUser(message.author, message.guild, (err, userProfile) => {
    if (err) {
      return module.exports.createUser(message.author.id, message.guild.id, experience, 0.00, message.author.username)
    }
    let cooldown = Math.floor(Math.random() * 300000) + 6000
    if (parseInt(userProfile.lastExperience) + cooldown >= Date.now() && cmd === 1) {
      return console.log('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, ` ${message.author.tag} gained xp too recently`)
    }
    if (userProfile.experience + experience >= userProfile.experienceCap) {
      module.exports.increaseLevel(userProfile.level + 1, message.member)
      message.channel.send(levelUpCard(userProfile.level + 1, message.member))
    }
    con.query(`UPDATE users SET experience = ${userProfile.experience + experience}, lastExperience = '${timeNow}', username = '${message.author.username}' WHERE userID = '${message.author.id}' AND guild = '${message.guild.id}'`, (error) => {
      if (error) console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, error)
      console.log('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, `gave xp to ${message.author.username} for their message '${message.content}'`)
    })
  })
}

module.exports.refreshUsername = (guild) => {
  if (!guild.available) return
  guild.members.fetch()
  .then(users => {
    users.forEach(user => {
      console.log(`refreshing user ${user.user.username}`)
      con.query(`UPDATE users SET username = '${user.user.username}' WHERE userID = '${user.id}' AND guild = '${guild}'`, (e) => {
        if (e) return console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, e)
      })
    })
  }).catch(console.error)
  console.log('done refreshing')
}