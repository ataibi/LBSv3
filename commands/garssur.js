const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let i = 0;
  let me=0;
  let msg = "";
  let gs = message.guild.roles.find('name', "LesGarsSûrs");
  if (!gs)
    return message.channel.send("Pas de role appelé \"LesGarsSûrs\" sur ce serveur, vous etes vraiment incertains !");
  gs.members.forEach(gmember => {
    if (i > 0)
      msg += ", ";
    msg += "<@" + gmember.id + ">";
    i++;
    if (gmember.id == bot.user.id)
      me = 1;
  });
  let emote = message.client.emojis.get("410832474382401546");
  if (i == 1)
    return message.channel.send(msg + " est un gars sûr, avec moi quand même " + (emote ? emote : ""));
  else if (i > 1 && me != 1)
    return message.channel.send(msg + " sont des gars sûrs, et moi bien sûr ! " + (emote ? emote : ""));
  else if (i > 1 && me == 1)
    return message.channel.send(msg + " sont des gars sûrs ! " + (emote ? emote : ""));
  else
    return message.channel.send("Je suis la seule entité sûre du serveur, nous sommes dans l'incertitude la plus totale !!!");
}

module.exports.help = {
  name: 'gs',
  description: 'Mentionne tous les gars sûrs du serveur.',
  examples: ['stp gs']
}
