// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const search = require('youtube-search')
const URL = require("url").URL;
const config = require('../config.json')
const addToQueue = require('../addToQueue.js')
const ytlist = require('youtube-playlist');


const isURL = (s) => {
    try {
        new URL(s)
        return true
    } catch (err) {
        return false
    }
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
    }
    if (isURL(args[0]) && !ytdl.validateURL(args[0])) {
        let videosAdded = 0
        ytlist(args[0], 'url')
            .then(videoURL => {
                console.log(videoURL)
                voiceChannel = message.member.voiceChannel
            if (!botIsConnected) {
                voiceChannel.join()
                    .then(voiceConnection => {
                        videoURL.data.playlist.forEach(video => {
                            setTimeout(() => {
                                addToQueue.video(video, message, voiceConnection, queue)
                            }, 100)
                            videosAdded++
                        })
                    })
                    .catch(console.error)
            } else {
                videoURL.data.playlist.forEach(video => {
                    setTimeout(() => {
                        addToQueue.video(video, message, botIsConnected, queue)
                    }, 100)
                    videosAdded++
                })
            }
            })
        if (videosAdded > 0)
            return console.log(`added ${videosAdded} titles to playlist`)
    }
    if (!isURL(args[0]) && !ytdl.validateURL(args[0])) {
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
                        addToQueue.video(video.link, message, voiceConnection, queue)
                    })
                    .catch(console.error)
            } else {
                addToQueue.video(video.link, message, botIsConnected, queue)
            }
        })
    } else {
        voiceChannel = message.member.voiceChannel
        if (!botIsConnected) {
            voiceChannel.join()
                .then(voiceConnection => {
                    addToQueue.video(args[0], message, voiceConnection, queue)
                })
                .catch(console.error)
        } else {
            addToQueue.video(args[0], message, botIsConnected, queue)
        }
    }
}

module.exports.help = {
    name: 'met',
    description: 'Met de la musique dans ta vie ! On adore ça',
    examples: 'stp met https://www.youtube.com/watch?v=Y3etG4ng'
}
