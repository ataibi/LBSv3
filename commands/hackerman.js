const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.channel.send({
    file: "./images/hackerman.png"
  });
}

module.exports.help = {
  name: 'hackerman',
  description: 't\'est trop un H4X0R',
  examples: 'stp hackerman'
}