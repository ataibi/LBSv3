const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.find("name", "LesGarsSûrs"))
    return message.reply("mdr t'as cru j'allais répéter ce que tu voulais ? Si t'es pas un gars sûr tu vaux **rien** pour moi.");
  let botmessage = args.join(" ");
  if (!args[0])
    return message.reply("tu veux me faire dire quelque chose mais tu me donnes rien à dire ? wtf dude");
  message.delete()
  .then(msg => console.log(`message deleted :  ${msg.cleanContent} (author : ${message.author.username}`))
  .catch(console.error);
  return message.channel.send(botmessage);
}

module.exports.help = {
  name: 'dit',
  description: 'repete après toi.(fonctions réservée aux gars sûrs ma gueule, j\'suis pas une victime)',
  examples: 'stp dit je suce des bites.'
}