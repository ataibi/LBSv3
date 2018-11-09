const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let dbar = message.client.emojis.find("name", "DBAR");
  message.react(dbar.id);
  return message.reply("hhh haha hahahaha heheheeheheheh hihihihihi hohohoohoh ouuuuuuuuhouhouhouhouhouhou ohhhhhh putain OUHOUHOUHOUHOUH AHAHAHAHAHAHAHAHAHAHAH MDRRRRRRR JPP AHAHAH XD krkrkrkrkrkrkrkrkkrkrkrkrkrkrkrkrkkr OULOULOU TU M'AS TUÉ PTDR JPP STP ARRETE MDRRRR ");
}

module.exports.help = {
  name: 'rigole',
  description: "T'es trop drole ma gueule putain",
  examples: 'stp rigole'
}