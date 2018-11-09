const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let date =  new Date();
  let day = date.getDay();
  if (day == 1)
    return message.channel.send("Today is monday 😴", {
      file: "./images/monday.jpg"
    });
  else if (day == 3)
    return message.channel.send("It's wednesday my dudes" + message.client.emojis.get("410832474382401546"), {
      file: "./images/wednesday.jpg"
    });
  else if (day == 4)
    return message.channel.send("Jeudi Ok is on the way" + message.client.emojis.get("408104603029078023"), {
      file: "./images/jeudiOK.jpg"
    });
  else
    return message.channel.send("It's not wednesday my friends.", {
      file: "./images/otherday.jpg"
    });
}

module.exports.help = {
  name: 'date',
  description: 'Donne le jour de la semaine sous une forme originale',
  examples: ['stp date']
}