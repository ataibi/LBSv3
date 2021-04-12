// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

const reduceVolume = (dispatcher, amount, message, queue) => {
    let  baseVolume = parseInt(dispatcher.volume * 100)
    if (baseVolume < 5) {
        return message.channel.send("je peux pas plus baisser")
    } else if (baseVolume < amount) {
        message.channel.send("Ok c'est bon j'ai baissé un peu mais on a attend le minimum")
        queue[0].streamOptions.volume = 0.05
        return dispatcher.setVolume(0.05)
    } else {
        queue[0].streamOptions.volume = parseFloat((baseVolume - amount)/100).toFixed(2)
        return dispatcher.setVolume(queue[0].streamOptions.volume)
    }
}

module.exports.run = async (bot, message, args, queue) => {
    let guildId = message.guild.id
    let botIsConnected = bot.voice.connections.get(message.guild.id)
    if (!botIsConnected ) {
        message.reply("j'suis pas co ma gueule")
    } else if (botIsConnected && botIsConnected.channel !== message.member.voice.channel) {
        return message.reply("faut venir dans mon chan vocal, j'suis posé je bouge **pas**.")
    } else if (botIsConnected.dispatcher && !botIsConnected.dispatcher.paused) {
        if (parseInt(args[0]) < 100 && parseInt(args[0])> 1)
            reduceVolume(botIsConnected.dispatcher, parseInt(args[0]), message, queue.guildId)
        else if (parseInt(args[0]))
            return message.reply('valeur INCORRECTE SALE PUTAIN DE TA RACE pardon je me suis laissé emporter... mais wesh aussi tu veux changer le son, fais un vrai truc')
        else {
            message.reply('ok je baisse att')
            reduceVolume(botIsConnected.dispatcher, 5, message, queue.guildId)
        }
    } else {
        if (botIsConnected.dispatcher)
            return message.reply("J'suis en pause et tu veux baisser le son ? nique toi c'est toi qui parle trop fort")
    }
}

module.exports.help = {
  name: 'baisse',
  description: 'baisse le son (max = 100) si tu donnes pas de valeur ça change de 5%',
  examples: 'stp baisse, stp baisse 5',
  category: 'musique'
}
