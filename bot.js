/* eslint-disable no-console */
console.clear()
const config = require('./config.json')
const Discord = require('discord.js')
const utilities = require('./users.js')
const fs = require('fs')
const bot = new Discord.Client()

bot.commands = new Discord.Collection()
bot.musicCommands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
  if (err) { console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err) }

  const jsfile = files.filter(f => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.")
    return
  }

  jsfile.forEach((f) => {
    const props = require(`./commands/${f}`)
    console.log('\x1b[32m[\u2713] \x1b[32m%s\x1b[0m', `./commands/${f} loaded \x1b[0m`)
    bot.commands.set(props.help.name, props)
  })
})


fs.readdir('./musicCommands', (err, files) => {
  if (err) { console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err) }

  const musicFiles = files.filter(mf => mf.split('.').pop() === 'js')
  if (musicFiles.length <= 0) {
    console.log("Couldn't find commands.")
    return
  }

  musicFiles.forEach((mf) => {
    const props = require(`./musicCommands/${mf}`)
    console.log('\x1b[32m[\u2713] \x1b[0m\x1b[32m%s\x1b[0m', `./musicCommands/${mf} loaded \x1b[0m`)
    bot.musicCommands.set(props.help.name, props)
  })
})

function talk (message) {
  const rand = Math.floor(Math.random() * 100) + 1
  const emoji = bot.emojis.cache.random()
  const phrases = ['LOURD!', 'Oui bien sûr', 'Non..', `suce moi ${message.author.username}`, 'J\'avous', `Eh ${message.author.username}, reste tranquille ma gueule`, 'C\'est pas drole.', 'YEET !']
  if (emoji) { phrases.push(`${emoji}`) }
  if (rand <= 3) {
    utilities.addXP(message, 35, 45, 0)
    message.channel.send(phrases[Math.floor(Math.random() * phrases.length)])
  }
}

function addReaction (message) {
  const rand = Math.floor(Math.random() * 1000) + 1
  const emoji = bot.emojis.cache.random().id
  if (rand >= 990) {
    utilities.addXP(message, 30, 40, 0)
    message.react(bot.emojis.cache.get(emoji))
  }
}

var botActive = 0
bot.on('ready', async () => {
  console.log('\x1b[33m[-] caching members...\x1b[0m')
  bot.guilds.fetch('396409083915272204')
  .then(guild => {
    guild.members.fetch()
    .then(console.log('\x1b[32m[\u2713] \x1b[0m\x1b[34mmembers cached \x1b[0m'))
    .catch(console.error)
  })
  .catch(console.error)
  console.log(`\x1b[32m[\u2713] \x1b[0m\x1b[34mlogged in as \x1b[0m\x1b[31m${bot.user.username} \x1b[0m`)
  botActivity(bot)
  checkVocalConnection(bot)
  botActive = 1
  setInterval(function () { botActivity(bot) }, (40 * 60) * 1000)
  setInterval(function () { checkVocalConnection(bot) }, (60 * 5) * 1000)
})

function botActivity (bot) {
  const games = ["la marelle sur l'autoroute", 'la roulette russe', 'touche pipi avec Tatsumaki']
  const bActivity = Math.floor(Math.random() * 3)
  if (botActive === 1) {
    bot.user.setActivity(null)
    botActive = 0
    setTimeout(() => bot.user.setActivity(games[bActivity]), 20 * 60 * 1000)
  } else {
    bot.user.setActivity(games[bActivity])
    botActive = 1
  }
}

function checkVocalConnection(bot) {
  bot.guilds.cache.each( guild => {
    utilities.addVocalXP(guild, 5, 16, 1)
  })
}

const queue = new Map()

bot.on('message', async message => {
  if ((message.author.bot === 1 && message.author.id !== bot.user.id) || message.channel.type === 'dm') { return }

  const prefix = config.prefix
  const messageArray = message.content.replace(/ +/g, ' ').split(' ')
  const args = messageArray.slice(2)
  
  talk(message)
  addReaction(message)
  if (messageArray[0].toLowerCase() !== prefix && messageArray[0] !== `<@!${bot.user.id}>`) { return }
  let cmd = messageArray[1]? messageArray[1].toLowerCase() : ''

  let i = 0
  let words = 0
  let identified = 0
  message.mentions.users.forEach(user => {
    if (user.id === bot.user.id) { identified = 1 }
    i++
  })
  words = messageArray.length
  if (i === 1 && identified === 1 && words === 1) { return message.reply('Oui ?') } else if (words === 1 && messageArray[0] === prefix) { return message.reply('Oui ? (`stp aide` pour l\'aide, t\'es nul.)') }

  if (cmd === '❤' || cmd === '<3') { cmd = 'jtm' }
  const commandfile = bot.commands.get(cmd)
  const musicFile = bot.musicCommands.get(cmd)
  if (commandfile) {
    utilities.addXP(message, 15, 30, 1)
    setTimeout(() => commandfile.run(bot, message, args), 12)
  } else if (musicFile) {
    utilities.addXP(message, 10, 25, 1)
    musicFile.run(bot, message, args, queue)
  } else { return message.reply("hmm... Je comprends absolument rien à ce que tu veux. Pour savoir quoi me demander, fais un petit 'stp aide' (t'es qu'une merde <3)") }
})

// bot.login(config.testoken)
bot.login(config.token)
