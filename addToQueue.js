const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const music = require('./music.js')
const ytlist = require('youtube-playlist');

module.exports.video = async (videoURL, message, voiceConnection, queue) => {
    console.log('yeet')
    const video = await ytdl.getInfo(videoURL)
    // console.log(video)
		if (!video) {
		console.error()
		return message.channel.send("euuuuh petit soucis de lecture, essaie une autre video")
        }
        console.log('coucou toi')
        const embedVar = new Discord.MessageEmbed()
            .setTitle(`🎵 **${video.videoDetails.title}** a été rajouté à la liste de lecture`)
            .addField('Durée :', ` ${Math.floor(video.videoDetails.lengthSeconds / 60)}:${parseInt(video.videoDetails.lengthSeconds % 60) < 10 ? '0' + video.videoDetails.lengthSeconds % 60 : video.videoDetails.lengthSeconds % 60}`)
            .setThumbnail(`https://i.ytimg.com/vi/${video.videoDetails.videoId}/hqdefault.jpg`)
            .setColor('DARK_RED')
            .setURL(videoURL)
            .setAuthor(`${message.author.username}`)
        message.channel.send({embed : embedVar} )
            .then((err, answer) => {
                if (!queue.guildId) {
                    console.log('pas de queue')
                    queue.guildId = []
                    queue.guildId[0] = {}
                    queue.guildId[0].streamOptions = { volume: 1 }
                    queue.guildId[0].url = videoURL
                    queue.guildId[0].title = video.videoDetails.title
                    queue.guildId[0].id = video.videoDetails.videoId
                    queue.guildId[0].addedBy = message.author.username
                    queue.guildId[0].duration = video.videoDetails.lengthSeconds
                    queue.guildId[0].loop = "none"
                    queue.guildId[0].np = false
                    music.playMusic(message.channel, voiceConnection, queue.guildId, 0, answer)
                } else {
                    console.log('queue deja creee')
                    let queueSize = queue.guildId.length
                    console.log('size : ' + queueSize)
                    queue.guildId[queueSize] = {}
                    queue.guildId[queueSize].addedBy = message.author.username
                    queue.guildId[queueSize].url = videoURL
                    queue.guildId[queueSize].id = video.videoDetails.videoId
                    queue.guildId[queueSize].np = false
                    queue.guildId[queueSize].duration = video.videoDetails.lengthSeconds
                    queue.guildId[queueSize].title = video.videoDetails.title
                    if (!voiceConnection.speaking) {
                        console.log('lourd')
                        music.playMusic(message.channel, voiceConnection, queue.guildId, queueSize, answer)
                    }
                }
            })
            .catch(console.error)
}

module.exports.playlist = async (playlistURL, message, voiceConnection, queue) => {
    console.log('yote')
    ytlist(playlistURL, 'url')
    .then(res => {
        res.foreach(videoURL => {
            module.exports.video(videoURL, message, voiceConnection, queue)
        })
    })
}