const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let ncommands = 0;
  bot.commands.forEach(command => ncommands++);

  if (ncommands <= 24) {
    let helpembed = new Discord.RichEmbed()
    .setDescription("Alors comme ça on a besoin d'aide ? Grosse flemme de faire du cas par cas donc j'te lache tous les trucs que tu peux me demander d'un coup :")
    .setColor("#A4244E");
    bot.commands.forEach(command =>{
        helpembed.addField(`__${command.help.name}:__ ${command.help.description}`, `\`${command.help.examples}\``);
    });

    try{
      message.author.send(helpembed);
      message.reply("bébé ? t'as reçu ma dick pic en MP? Allez va donc voir ;)");
    }catch(e)
    {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?");
    }
  }
  else
  {
    try{
      message.author.send("Alors comme ça on a besoin d'aide ? Grosse flemme de faire du cas par cas donc j'te lache tous les trucs que tu peux me demander d'un coup :")
      .then(() =>{
        ncommands = 0;
        let nPage = 0;
        let helpembed = new Discord.RichEmbed()
        .setColor("#A4244E");
        helpembed.addField(`**Page ${nPage + 1}**`, "__");
        bot.commands.forEach(command =>{
            ncommands++;
            if (ncommands >= 25)
            {
              message.author.send(helpembed);
              helpembed = new Discord.RichEmbed();
              helpembed.setColor("#A4244E")
              nPage++;
              helpembed.addField(`**Page ${nPage + 1}**`, "__");
              ncommands = 0;
            }
            helpembed.addField(`__${command.help.name}:__ ${command.help.description}`, `\`${command.help.examples}\``);
        });
        if (nPage > 0 && ncommands < 24)
          message.author.send(helpembed);
      });
      message.reply("bébé ? t'as reçu ma dick pic en MP? Allez va donc voir ;)");
    }catch(e)
    {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?");
    }
  }
}

module.exports.help = {
  name: 'pls',
  description: 'Pour les cas de PLS ultime, affiche l\'aide',
  examples: 'stp pls'
}
