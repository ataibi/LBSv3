const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("../config.json");

var con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

con.connect(err => {
  if (err)
    throw err;
  console.log("Connected to database.");
});

module.exports.run = async (bot, message, args) => {
  let maxNumber;
  if ( !( maxNumber = parseInt( args[0] ) ) )
    maxNumber = 24;
  con.query(`SELECT * FROM experience WHERE guild = ${message.guild.id} ORDER BY xp DESC`, (err, userList) => {
    if (err) console.log(err);
    if (userList[0] && userList.length > 1 && userList.length < 25)
    {
      let ladder = new Discord.RichEmbed()
      .setTitle(`Classement de certitude chez \`${message.guild.name}\``)
      .setColor('GOLD');
      let position = 0;
      let user;
      while (userList[position] && position < maxNumber)
      {
        user = message.guild.members.find(userObject => userObject.id === userList[position].id);
        console.log({position, user});
        ladder.addField(`__**#${position + 1} : ${user ? user.displayName : "Perdu dans l'incertitude"}**__`, `_${userList[position].xp} points de certitude._`);
        position++;
      }
      message.channel.send(ladder);
    }
  });
}

module.exports.help = {
  name: 'top',
  description: 'liste les n personnes les plus certaines du serveur (liste tous les utilisateurs par defaut)',
  examples: 'stp top 10, stp top'
}
