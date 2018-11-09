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
	let cleanArg = 0;
	if (args[0] != undefined)
		cleanArg = args[0].replace(/\D/g,'');
	let target = (cleanArg != 0 && message.guild.members.find('id', cleanArg) != undefined) ? message.guild.members.find('id', cleanArg).user : message.author;

	if (target.bot && target != bot.user)
		return message.reply("Même s'ils sont lourds, les bots sont incertains ma gueule (sauf moi bien sûr, t'as cru j'étais qui?)");
	else if (target == bot.user)
	{
		rank = "Bot Sûr";
		prestige = " **V**";
		color = "AD001D";
		let xpCard = new Discord.RichEmbed()
			.setThumbnail(bot.user.avatarURL)
			.setTitle(bot.user.username)
			.addField("Points de certitude :", "**∞**")
			.addField("Points requis pour le rang suivant :", "Tu peux pas faire plus sûr")
			.addField("Rang :", rank+prestige)
			.setColor(color);
		return message.channel.send(xpCard);
	}
	con.query(`SELECT * FROM experience WHERE id = '${target.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
			if (err)
			throw err;
			if (!rows[0])
			return message.channel.send(target + " n'a aucune certitude.");


			let xp = rows[0].xp;
			let level = 1;
			let xpPool = 1234;
			while (xp >= xpPool)
			{
			level++;
			xp = xp - xpPool;
			xpPool = xpPool * 1.5;
			}



			let color;
			let rank;
			let prestige;
			if (level < 10)
			{
				color = "#FFC71E";
				if (level <= 5)
					rank = "Judas";
				else
					rank = "Gars Patibulaire"
			}
			else if (level >= 10 && level < 20)
			{
				color = "E82C0C";
				if (level <= 15)
					rank = "Gars Perfide";
				else
					rank = "Gars Incertain";
			}
			else if (level >= 20)
			{
				color = "AD001D";
				if (level <= 25)
					rank = "Gars Solide"
				else
					rank = "Gars Sûr"
			}
			if (level > 30)
				level = 30
					switch (level % 5)
					{
						case 0:
							prestige = " **V**";
							break;
						case 1:
							prestige = " **I**";
							break;
						case 2:
							prestige = " **II**";
							break;
						case 3:
							prestige = " **III**";
							break;
						case 4:
							prestige = " **IV**";
							break;
						default:
							prestige = "";
					}

			con.query(`SELECT * FROM certithunes WHERE id = '${target.id}' AND guild = '${message.guild.id}'`, (err, certi) =>
				{
				if (err)
					throw err;
				if (!certi[0])
					thunes = 0;
				else
					thunes = certi[0].amount;
					var xpCard = new Discord.RichEmbed()
					.setThumbnail(target.avatarURL)
					.setTitle(target.username)
					.addField("Points de certitude :", rows[0].xp)
					.addField("Points requis pour le rang suivant :", Math.floor(xpPool - xp))
					.addField("Rang :", rank+prestige)
					.addField("Certithunes :", thunes)
					.setColor(color);
				con.query(`SELECT * FROM shop WHERE userID = '${target.id}' AND guildID = '${message.guild.id}' AND itemID = '1'`, (err, rows) =>
					{
					if (rows.length > 0)
					{
						function formatDate(date) {
  					var day = date.getDate();
  					var monthIndex = date.getMonth();
  					var year = date.getFullYear();
  					return day + '/' + (++monthIndex) + '/' + year;
					}
						if (new Date(parseInt(rows[0].expiresOn)) > (new Date()))
							xpCard.addField("Bonus de certitude : ", `Jusqu'au ${formatDate(new Date(parseInt(rows[0].expiresOn)))}`)
						else
							xpCard.addField("Bonus de certitude : ", `Jusqu'au ${formatDate(new Date(parseInt(rows[0].expiresOn)))} (expiré)`)
					}
					else {
						xpCard.addField("Bonus de certitude : ", `Aucun bonus n'a été acheté pour l'instant (On manque de moyen ${target.username} ?)`)
					}
					return message.channel.send(xpCard);
					});

				});
	});
}

module.exports.help = {
name: 'certitude',
	  description: 'Ouais parce que mon dev savait pas quoi faire alors il a mis un systeme d\'experience en place',
	  examples: 'stp certitude, stp certitude @user#1234'
}
