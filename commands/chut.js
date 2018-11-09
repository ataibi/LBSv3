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
  {
    return message.channel.send(msg + ", shhhhhhhh", {
    file: "./images/sh.jpg"
    });
  }
  else
  {
    return message.channel.send("SHHHH", {
    file: "./images/sh.jpg"
    });
  }
}

module.exports.help = {
  name: 'chut',
  description: 'Laisse toi faire.',
  examples: ['stp chut', 'stp chut @user#1234']
}