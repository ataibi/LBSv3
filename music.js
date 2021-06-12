// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord')

module.exports.playMusic = async (textChannel, voiceConnection, queue, index, answer) => {
    const stream = await ytdl(queue[index].url) /*, { filter: 'audio', quality: 'highestaudio' })*/

    voiceConnection.play(await ytdl(queue[index].url), {type: 'opus', volume: 1})
    textChannel.send(`Et c'est le moment de _**${queue[index].title}**_ sur **DISCORD FM !** 🎵`)
    queue[index].np = true
    voiceConnection.on('speaking', (isSpeaking) => {
        
        if (!isSpeaking) {
            queue[index].np = false
            if (queue[index + 1] && queue[0].loop !== "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index + 1)), 5)
            } else if (queue[0].loop === "song") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(index)), 5)
            } else if (!queue[index + 1] && queue[0].loop === "all") {
                setTimeout(() => module.exports.playMusic(textChannel, voiceConnection, queue, parseInt(0)), 5)
            }
        }
    })
    voiceConnection.on('error', (error) => {
        console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, error)
    })
    voiceConnection.on('debug', (debug) => { console.debug('lourd ' + debug)})
}