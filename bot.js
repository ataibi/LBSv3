const config = require("./config.json");
const Discord = require("discord.js");
const utilities = require("./utilities.js");
const fs = require("fs");
const bot = new Discord.Client();


bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if (err)
    console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(f + " loaded");
    bot.commands.set(props.help.name, props);
  });
});

function talk(message)
  {
  let rand = Math.floor(Math.random() * 100) + 1;
  console.log(rand);
  let phrases = Array('LOURD!', 'oui bien sûr', 'non..', 'suce moi ma poule', 'j\'avous', 'reste tranquille ma gueule', 'c\'est pas drole.', 'YEET !');
  if (rand <= 3)
  {
    utilities.addXP(message, 30, 55, 0);
    message.reply(phrases[Math.floor(Math.random()*phrases.length)]);
  }
}
var botActive = 0;
bot.on("ready", async () => {
  console.log(`logged in as ${bot.user.username}`);
  botActivity(bot);
  botActive = 1;
  setInterval(function() {botActivity(bot)}, (40 * 60) * 1000);
});


function botActivity (bot)
{
  games = Array("la marelle sur l'autoroute", "la roulette russe", "touche pipi avec Tatsumaki");
  bActivity = Math.floor(Math.random() * 3);
  if (botActive == 1)
  {
    bot.user.setActivity(null);
    botActive = 0;
    setTimeout(() => bot.user.setActivity(games[bActivity]), 20 * 60 * 1000);
  }
  else
  {
    bot.user.setActivity(games[bActivity]);
    botActive = 1
  }
}

bot.on("message", async message => {
  if((message.author.bot == 1 && message.author.id != bot.user.id) || message.channel.type == "dm")
		return ;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[1];
  let args = messageArray.slice(2);

  talk(message);

  if (messageArray[0].toLowerCase() != prefix && messageArray[0] != `<@${bot.user.id}>`)
    return;

  let i = 0;
  let words = 0;
  let identified = 0;
  message.mentions.users.forEach(user => {
    if (user.id == bot.user.id)
      identified = 1;
    i++;
  });
  message.content.split(" ").forEach(word => words++);
  if (i == 1 && identified == 1 && words == 1)
      return message.reply('Oui ?');
  else if (words == 1 && messageArray[0] == prefix)
      return message.reply('Oui ? (stp pls pour l\'aide, t\'es nul.)');

  if (cmd == "❤" || cmd == "<3")
    cmd = "jtm";
  let commandfile = bot.commands.get(cmd);
  if (commandfile)
  {
    utilities.addXP(message, 15, 27, 1);
    setTimeout(() => commandfile.run(bot, message, args), 12);
  }
  else
    return message.reply("hmm... Je comprends absolument rien à ce que tu veux. Pour savoir quoi me demander, fais un petit 'stp pls' (t'es qu'une merde <3)");

});

bot.login(config.testoken);
// bot.login(config.token);
