// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core')

module.exports.playMusic = async (textChannel, voiceConnection, queue, index, answer) => {
    const stream = ytdl(queue[index].url, { filter: 'audioonly' })

    const dispatcher = voiceConnection.play(stream, queue[0].streamOptions)
    textChannel.send(`Et c'est le moment de _**${queue[index].title}**_ sur **DISCORD FM !** 🎵`)
    queue[index].np = true
    dispatcher.on('speaking', (isSpeaking) => {
        
        if (!isSpeaking) {
            queue[index].np = false
            if (queue[index + 1] && queue[0].loop !== "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index + 1)), 5)
            } else if (queue[0].loop === "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index)), 5)
            } else if (!queue[index + 1] && queue[0].loop === "all") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(0)), 5)
            // } else {
            //     dispatcher.pause()
            }
        }
    })
    dispatcher.on('error', (error) => {
        console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, error)
    })
    dispatcher.on('debug', (debug) => { console.debug(debug)})
}