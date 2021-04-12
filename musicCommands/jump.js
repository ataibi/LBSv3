// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const { video } = require('../addToQueue.js')
const music = require('../music.js')

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    let botIsConnected = bot.voice.connections.get(guildId)
    if (!queue.guildId) {
        return message.reply('pas de queue sur ce serveur.. si tu vois ce que je veux dire')
    } else if (!parseInt(args[0]) || !queue.guildId[parseInt(args[0]) - 1]) {
        return message.reply('faut rentrer un chiffre correct...')
    } else if (!message.member.voice.channel) {
        return message.reply('Faut être dans un voice chan pour demander de play ma gueule')
    } else if (botIsConnected && botIsConnected.channel !== message.member.voice.channel) {
        return message.reply("faut venir dans mon chan vocal, j'suis posé je bouge **pas**.")
    } else {
        let voiceChannel = message.member.voice.channel
        if (!botIsConnected) {
            voiceChannel.join()
                .then(voiceConnection => {
                    music.playMusic(message.channel, voiceConnection, queue.guildId, parseInt(args[0]) - 1)
                })
        } else {
            if (botIsConnected.dispatcher)
                botIsConnected.dispatcher.end('jump')
            queue.guildId.forEach(video => {
                if (video.np)
                    video.np = 0
            })
            music.playMusic(message.channel, botIsConnected, queue.guildId, parseInt(args[0]) - 1)
        }
    }
    
}

module.exports.help = {
    name: 'pick',
    description: 'Affiche la liste de lecture en cours',
    examples: 'stp pick',
    category: 'musique'
  }
  
