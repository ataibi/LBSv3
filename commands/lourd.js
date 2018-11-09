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
    return message.channel.send(msg + ", c'est lourd ma poule.");
  else if (i > 1)
    return message.channel.send(msg + ", c'est lourd ok donc on se calme les cocos.");
  else
    return message.reply(" c'est ULTRA LOURD !!");
}

module.exports.help = {
  name: 'lourd',
  description: 'Dit à l\'utilisateur mentionné que c\'est lourd',
  examples: ['stp lourd @user#1234', 'stp lourd' ]
}