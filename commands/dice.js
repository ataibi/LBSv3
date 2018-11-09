const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rand = Math.floor(Math.random() * 6) + 1;
  return message.reply(rand);
}

module.exports.help = {
  name: 'jetdedé',
  description: 'Envoie un chiffre aleatoire entre 1 et 6',
  examples: 'stp jetdedé'
}