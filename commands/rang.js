const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let level = 1;
  let xpPool = {};
  xpPool[1] = 1234;
  while (level < 30)
  {
    level++;
    xpPool[level] = xpPool[level - 1] * 1.5;
  }
  let rangCard = new Discord.RichEmbed()
  .setTitle("__**LES RANGS DE LA CERTITUDE**__")
  .setColor("0CA170")
  .addField("__Judas :__", `De **0** à **${parseInt(xpPool[6]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points certitude.`)
  .addField("__Gars Patibulaire :__", `De **${parseInt(xpPool[6]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** à **${parseInt(xpPool[11]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points de certitude.`)
  .addField("__Gars Perfide :__", `De **${parseInt(xpPool[11]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** à **${parseInt(xpPool[16]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points de certitude.`)
  .addField("__Gars Incertain :__", `De **${parseInt(xpPool[16]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** à **${parseInt(xpPool[21]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points de certitude.`)
  .addField("__Gars Solide :__", `De **${parseInt(xpPool[21]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** à **${parseInt(xpPool[26]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points de certitude.`)
  .addField("__Gars Sûr :__", `À partir de **${parseInt(xpPool[26]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}** points de certitude.`);
  message.channel.send(rangCard);
}

module.exports.help = {
  name: 'rang',
  description: 'liste tous les rangs',
  examples: 'stp rang'
}
