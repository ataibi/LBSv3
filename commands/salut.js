const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let target = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
  return message.channel.send(target+" tu t'en vas ?! Tu vas me manquer, salut mon pote !", {
    file: "./images/salut.jpg"
  });
}

module.exports.help = {
  name: 'salut',
  description: 'dit au revoir au bot, ça fait pas de mal un peu de politesse, grosse pute va!',
  examples: 'stp salut'
}