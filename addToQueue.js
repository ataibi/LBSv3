const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const music = require('./music.js')
const ytlist = require('youtube-playlist');

module.exports.video = async (videoURL, message, voiceConnection, queue) => {
    console.log('yeet')
    ytdl.getInfo(videoURL, (err, video) => {
		if (err) {
		console.log(err)
		return message.channel.send("euuuuh petit soucis de lecture, essaie une autre video")
		}
        const embed = new Discord.RichEmbed()
            .setTitle(`🎵 **${video.title}** a été rajouté à la liste de lecture`)
            .addField('Durée :', ` ${Math.floor(video.videoDetails.lengthSeconds / 60)}:${parseInt(video.videoDetails.lengthSeconds % 60) < 10 ? '0' + video.videoDetails.lengthSeconds % 60 : video.videoDetails.lengthSeconds % 60}`)
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
                    queue.guildId[0].title = video.videoDetails.title
                    queue.guildId[0].id = video.videoDetails.videoId
                    queue.guildId[0].addedBy = message.author.username
                    queue.guildId[0].duration = video.videoDetails.lengthSeconds
                    queue.guildId[0].loop = "none"
                    queue.guildId[0].np = false
                    music.playMusic(message.channel, voiceConnection, queue.guildId, 0, answer)
                } else {
                    let queueSize = queue.guildId.length
                    console.log('size : ' + queueSize)
                    queue.guildId[queueSize] = {}
                    queue.guildId[queueSize].addedBy = message.author.username
                    queue.guildId[queueSize].url = videoURL
                    queue.guildId[queueSize].id = video.videoDetails.videoId
                    queue.guildId[queueSize].np = false
                    queue.guildId[queueSize].duration = video.videoDetails.lengthSeconds
                    queue.guildId[queueSize].title = video.title
                    if (!voiceConnection.speaking)
                        music.playMusic(message.channel, voiceConnection, queue.guildId, queueSize, answer)
                }
            })
            .catch(console.error)
    })
    console.log('lourd')
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