// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const music = require('../music.js')
const search = require('youtube-search')
const URL = require("url").URL;
const config = require('../config.json')

const isURL = (s) => {
    try {
        new URL(s)
        return true
    } catch (err) {
        return false
    }
}


const addToQueue = async (videoURL, message, voiceConnection, queue) => {
    console.log('yeet')
    ytdl.getInfo(videoURL, (err, video) => {
		if (err) {
		console.log(err)
		return message.channel.send("euuuuh petit soucis de lecture, essaie une autre video")
		}
        const embed = new Discord.RichEmbed()
            .setTitle(`🎵 **${video.title}** a été rajouté à la liste de lecture`)
            .addField(`${video.author.name} ${video.author.verified ? '✔️' : ''}`, `Durée : ${Math.floor(video.length_seconds / 60)}:${parseInt(video.length_seconds % 60) < 10 ? '0' + video.length_seconds % 60 : video.length_seconds % 60}`)
            .setThumbnail(`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`)
            .setColor('DARK_RED')
            .setURL(videoURL)
            .addField('Ajouté par :', `${message.author.username}`)
        message.channel.send(embed)
            .then((err, answer) => {
                if (!queue.guildId) {
                    queue.guildId = []
                    queue.guildId[0] = {}
                    queue.guildId[0].streamOptions = {
                        seek: 0,
                        volume: 0.5
                    }
                    queue.guildId[0].url = videoURL
                    queue.guildId[0].title = video.title
                    queue.guildId[0].id = video.video_id
                    queue.guildId[0].author = video.author.name
                    queue.guildId[0].addedBy = message.author.username
                    queue.guildId[0].duration = video.length_seconds
                    queue.guildId[0].loop = "none"
                    queue.guildId[0].np = false
                    music.playMusic(message.channel, voiceConnection, queue.guildId, 0, answer)
                } else {
                    let queueSize = queue.guildId.length
                    console.log('size : ' + queueSize)
                    queue.guildId[queueSize] = {}
                    queue.guildId[queueSize].author = video.author.name
                    queue.guildId[queueSize].addedBy = message.author.username
                    queue.guildId[queueSize].url = videoURL
                    queue.guildId[queueSize].id = video.video_id
                    queue.guildId[queueSize].np = false
                    queue.guildId[queueSize].duration = video.length_seconds
                    queue.guildId[queueSize].title = video.title
                    if (!voiceConnection.speaking)
                        music.playMusic(message.channel, voiceConnection, queue.guildId, queueSize, answer)
                }
            })
            .catch(console.error)
    })
    console.log('lourd')
}

module.exports.run = async (bot, message, args, queue) => {
    botIsConnected = bot.voiceConnections.get(message.guild.id)
    let guildId = message.guild.id
    let voiceChannel
    if (!message.member.voiceChannel) {
        return message.reply('Faut être dans un voice chan pour demander de play ma gueule')
    } else if (botIsConnected && botIsConnected.channel !== message.member.voiceChannel) {
        return message.reply("faut venir dans mon chan vocal, j'suis posé je bouge **pas**.")
    } else if (!args[0]) {
        return message.reply(`Wesh t'es teubé faut me donner un lien pour play, si tu veux reprendre la lecture, fait un petit "stp reprend" (ouais c'était plus simple à coder comme ça mdr)`)
    } else if (!isURL(args[0]) && !ytdl.validateURL(args[0])) {
        var options = {
            maxResults: 50,
            key: config.googleAPI,
            type: 'video'
          }
          let index = 1
          let query = ''
          if (!isNaN(args[0]) && args[1]) {
            index = args[0]
            if (index <= 0 || index >= 51) { index = 1 }
            query = args.slice(1).join(' ')
          } else { query = args.join(' ') }
          index = Math.floor(index)
          const answer = `Youtube me donne ça pour '${query}'\n`
          search(query, options, (err, res) => {
            if (err) {
              console.log(`index = ${index}, response = ${res}`)
              console.error(err)
            }
            const video = res[index - 1]
            voiceChannel = message.member.voiceChannel
            if (!botIsConnected) {
                voiceChannel.join()
                    .then(voiceConnection => {
                        addToQueue(video.link, message, voiceConnection, queue)
                    })
                    .catch(console.error)
            } else {
                addToQueue(video.link, message, botIsConnected, queue)
            }
          })
    } else {
        voiceChannel = message.member.voiceChannel
        if (!botIsConnected) {
            voiceChannel.join()
                .then(voiceConnection => {
                    addToQueue(args[0], message, voiceConnection, queue)
                })
                .catch(console.error)
        } else {
            addToQueue(args[0], message, botIsConnected, queue)
        }
    }
}

module.exports.help = {
    name: 'met',
    description: 'Met de la musique dans ta vie ! On adore ça',
    examples: 'stp play https://www.youtube.com/watch?v=Y3etG4ng'
}
