const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.guild.roles.forEach(role => {
    if (role.name == message.author.username)
      role.delete();
  });
  return message.reply("bon normalement ta/tes couleurs sont supprimées mdr.");
}

module.exports.help = {
  name: 'supprime',
  description: 'supprime ta ou tes couleurs de pseudo ',
  examples: 'stp supprime'
}
