
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rand = (Math.random() * 10) + 1;

  if (rand > 8)
    return message.reply("je t'aime pas moi, t'es une merde");
  else
    return message.reply("je t'aime aussi bébé <3 <3 <3");
}

module.exports.help = {
  name: 'jtm',
  description: 'donne moi ton amour <3',
  examples: 'stp jtm'
}