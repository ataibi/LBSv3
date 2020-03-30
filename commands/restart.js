// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '193050083674161152')
        return message.reply("Ton pouvoir n'a aucune emprise sur moi, enfant de plouc")
    else message.channel.send('je reviens')
        bot.commands.forEach( async cmd => {
          await bot.unloadCommand(cmd)
        })
        process.exit(1)
}

module.exports.help = {
  name: 'gtfo',
  description: 'Restart le bot',
  examples: 'stp gtfo'
}