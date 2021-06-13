const ytdl = require('ytdl-core-discord')

const play = async () => {
  const response = await ytdl('https://www.youtube.com/watch?v=TGMJRnUxwwo', { type: 'opus', volume: 1, filter: 'audioonly' })
  console.log(response)
}

play()
