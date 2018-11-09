const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.channel.send("On passe un petit coup de balai par ici, continuez vos occupations mes gars sûrs", {
    file: "./images/nettoie.gif"
  });
}

module.exports.help = {
  name: 'nettoie',
  description: 'Passe un petit coup de balai dans la convo',
  examples: ['stp nettoie']
}