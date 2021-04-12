// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const dbar = message.client.emojis.cache.find(emoji => emoji.name === 'DBAR')
  message.react(dbar.id)
  return message.reply("hhh haha hahahaha heheheeheheheh hihihihihi hohohoohoh ouuuuuuuuhouhouhouhouhouhou ohhhhhh putain OUHOUHOUHOUHOUH AHAHAHAHAHAHAHAHAHAHAH MDRRRRRRR JPP AHAHAH XD krkrkrkrkrkrkrkrkkrkrkrkrkrkrkrkrkkr OULOULOU TU M'AS TUÉ PTDR JPP STP ARRETE MDRRRR ")
}

module.exports.help = {
  name: 'rigole',
  description: "T'es trop drole ma gueule putain",
  examples: 'stp rigole',
  category: 'ponctuation'
}
