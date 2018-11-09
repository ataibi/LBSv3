const Discord = require("discord.js");
const config = require("../config.json");
const imageSearch = require('image-search-google');

const engine = new imageSearch(config.engineID , config.googleAPI);

module.exports.run = async (bot, message, args) => {
  console.log("args[0]= " + args[0]);
  let index = 1;
  let query = "";
  let pageNumber = 1;
  if (!isNaN(args[0]) && args[1])
  {
    index = args[0];
    if (index <= 0 || index >= 100)
      index = 1;
    query = args.slice(1).join(" ");
      while (index > 10)
      {
        index = index - 10;
        pageNumber += 10;
      }
  }
  else
    query = args.join(" ");
  index = Math.floor(index);
  engine.search(query, {page: pageNumber})
  .then(images => {
    console.log(query + " " + pageNumber + " " + index);
    return message.reply(`Google Images me donne ça pour '${query}'\n${images[index - 1].url}`);
  }).catch(e => {console.log(e);});
}

module.exports.help = {
  name: 'rg',
  description: '\'rg\' pour recherche google, ça envoie le premier resultat de la recherche d\'images',
  examples: 'stp rg voiture'
}
