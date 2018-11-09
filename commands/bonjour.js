const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.reply("Coucou toi, ça va ?", {
    file: "./images/bonjour.jpg"
  });
}

module.exports.help = {
  name: 'bonjour',
  description: 'dit bonjour au bot batard!',
  examples: 'stp bonjour'
}