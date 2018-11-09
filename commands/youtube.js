const config = require("../config.json");
const Discord = require("discord.js");
const search = require("youtube-search");

module.exports.run = async (bot, message, args) => {
  var options = {
    maxResults: 1,
    key: config.googleAPI,
    type: 'video'
  };
  let query = "";
  if (!isNaN(args[0]) && args[1])
      query = args.slice(1).join(" ");
  else
    query = args.join(" ");
  let answer = `Le premier resultat sur youtube pour '${query}' c'est\n`;
  search(query, options, (err, res) =>
  {
    if (err)
      throw err;
    let video = res[0];
    return message.reply(answer + video.link)
  });
}

module.exports.help = {
  name: 'youtube',
  description: 'pff vraiment, une description pour cette commande aussi ? assisté/10... Ca envoie la premiere vidéo de ta recherche',
  examples: 'stp youtube kawaii compilation'
}
