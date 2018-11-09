const Discord = require("discord.js");
const config = require("../config.json");
const giphy = require("giphy-api")(config.giphyAPI);

module.exports.run = async (bot, message, args) => {
  let query = "";
  if (!isNaN(args[0]) && args[1])
      query = args.slice(1).join(" ");
  else
    query = args.join(" ");
  let answer = `voilà ce que me donne giphy resultats pour '${query}'\n`;
  giphy.search({q: query, limit: 2}, (err, res) =>
  {
    if (err)
      throw err;
    let gif = res.data[0];
    return message.reply(answer + gif.url)
  });
}

module.exports.help = {
  name: 'gif',
  description: 'bah je cherche un gif sur internet, t\'as vraiment besoin d\'une description pour ça ?',
  examples: 'stp gif I\'m swinging'
}
