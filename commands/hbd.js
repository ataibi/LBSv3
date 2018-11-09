const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let i = 0;
  let msg = "";
  message.mentions.users.forEach(user => {
    if (i > 0)
      msg += ", ";
    msg += "<@" + user.id + ">";
    i++;
  });
  if (i > 0)
    msg += ", ";
  return message.channel.send(msg + "joyeux anniversaire BG", {
    file: "./images/hbd.jpg"
  });
}

module.exports.help = {
  name: 'hbd',
  description: 'Souhaite un joyeux anniversaire à l\'utilisateur identifié',
  examples: ['stp hbd @user#1234']
}