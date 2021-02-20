// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const config = require('../config.json')
const Users = require('../users.js')

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '193050083674161152')
        return message.reply("Ton pouvoir n'a aucune emprise sur moi, enfant de plouc")
    else message.channel.send('ca part')
    Users.refreshUsername(message.guild)
}

module.exports.help = {
  name: 'refresh',
  description: "refresh les noms d'utilisateurs dans la base de donnée",
  examples: 'stp refresh'
}