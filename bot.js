/* eslint-disable no-console */
const config = require('./config.json')
const Discord = require('discord.js')
const utilities = require('./users.js')
const fs = require('fs')
const bot = new Discord.Client()

bot.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
  if (err) { console.log(err) }

  const jsfile = files.filter(f => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.")
    return
  }

  jsfile.forEach((f) => {
    const props = require(`./commands/${f}`)
    console.log(f + ' loaded')
    bot.commands.set(props.help.name, props)
  })
})

function talk (message) {
  const rand = Math.floor(Math.random() * 100) + 1
  console.log(rand)
  const emoji = bot.emojis.random()
  const phrases = ['LOURD!', 'Oui bien sûr', 'Non..', `suce moi ${message.author.username}`, 'J\'avous', `Eh ${message.author.username}, reste tranquille ma gueule`, 'C\'est pas drole.', 'YEET !']
  if (emoji) { phrases.push(`${emoji}`) }
  if (rand <= 3) {
    utilities.addXP(message, 35, 45, 0)
    message.channel.send(phrases[Math.floor(Math.random() * phrases.length)])
  }
}

function addReaction (message) {
  const rand = Math.floor(Math.random() * 1000) + 1
  console.log(`Random for reaction : ${rand}`)
  const emoji = bot.emojis.random().id
  if (rand >= 990) {
    utilities.addXP(message, 30, 40, 0)
    message.react(bot.emojis.get(emoji))
  }
}

var botActive = 0
bot.on('ready', async () => {
  console.log(`logged in as ${bot.user.username}`)
  botActivity(bot)
  botActive = 1
  setInterval(function () { botActivity(bot) }, (40 * 60) * 1000)
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

bot.on('message', async message => {
  if ((message.author.bot === 1 && message.author.id !== bot.user.id) || message.channel.type === 'dm') { return }

  const prefix = config.prefix
  const messageArray = message.content.replace(/ +/g, ' ').split(' ')
  const args = messageArray.slice(2)
  
  talk(message)
  addReaction(message)
  if (messageArray[0].toLowerCase() !== prefix && messageArray[0] !== `<@${bot.user.id}>`) { return }
  let cmd = messageArray[1].toLowerCase()

  let i = 0
  let words = 0
  let identified = 0
  message.mentions.users.forEach(user => {
    if (user.id === bot.user.id) { identified = 1 }
    i++
  })
  words = messageArray.length
  if (i === 1 && identified === 1 && words === 1) { return message.reply('Oui ?') } else if (words === 1 && messageArray[0] === prefix) { return message.reply('Oui ? (stp pls pour l\'aide, t\'es nul.)') }

  if (cmd === '❤' || cmd === '<3') { cmd = 'jtm' }
  const commandfile = bot.commands.get(cmd)
  if (commandfile) {
    utilities.addXP(message, 15, 30, 1)
    setTimeout(() => commandfile.run(bot, message, args), 12)
  } else { return message.reply("hmm... Je comprends absolument rien à ce que tu veux. Pour savoir quoi me demander, fais un petit 'stp pls' (t'es qu'une merde <3)") }
})

bot.login(config.testoken)
// bot.login(config.token)
