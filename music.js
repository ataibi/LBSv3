// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core')

module.exports.playMusic = async (textChannel, voiceConnection, queue, index, answer) => {
    const stream = ytdl(queue[index].url, { filter: 'audioonly' })

    const dispatcher = voiceConnection.playStream(stream, queue[0].streamOptions)
    textChannel.send(`Et c'est le moment de _**${queue[index].title}**_ sur **DISCORD FM !** 🎵`)
    queue[index].np = true
    dispatcher.on('end', (reason) => {
        
        if (reason && reason !== 'jump') {
            queue[index].np = false
            if (queue[index + 1] && queue[0].loop !== "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index + 1)), 5)
            } else if (queue[0].loop === "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index)), 5)
            } else if (!queue[index + 1] && queue[0].loop === "all") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(0)), 5)
            } else {
                dispatcher.pause()
            }
        } else if (reason === 'jump' || reason === 'skip') {
            queue[index].np = false
        }
    })
    dispatcher.on('error', (error) => {
        console.log('error')
    })
}