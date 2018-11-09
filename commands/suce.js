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
  if (i == 1)
    return message.channel.send(msg + ", suce ma bite grosse merde.");
  else if (i > 1)
    return message.channel.send(msg + ", sucez ma bite bande d'incapables.");
  else
    return message.reply(" ok je te suce mamene * **sloppy BJ** *");
}

module.exports.help = {
  name: 'suce',
  description: 'Dit à l\'utilisateur mentionné de lui sucer la bite, s\'il n\'y en a pas, suce l\'auteur du message',
  examples: ['stp suce @user#1234', 'stp suce' ]
}