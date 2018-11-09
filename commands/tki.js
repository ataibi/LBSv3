const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Je suis le début et la fin, l'alpha et l'oméga, la certitude et l'incertitude, je suis tout et je ne suis rien, je suis... \n**LeBotSûr, version 2.0**")
  .setColor("#8D0F0B")
  .setThumbnail("../images/tki.png");

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "tki",
  description: "Si tu sais pas qui j'suis",
  examples: "stp tki"
}
