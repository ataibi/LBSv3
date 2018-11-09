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
	let author = message.author;
	var certithunes;
	let certitude;
	var level = 1;
	con.query(`SELECT * FROM experience WHERE id = '${author.id}' AND guild = '${message.guild.id}'`, (e, certi) =>
			{
			if (e)
			console.error(e);
			if (!certi[0])
			certitude = 0;
			else
			certitude = certi[0].xp;
			let levelPool = 1234;
			while (certitude > levelPool)
			{
			level++;
			certitude -= levelPool;
			levelPool = levelPool * 1.5
			}

			const stock = {
			"1": {"id": 1, "price": (3 * 6 * level), "description": "Gagne le double de certitude pendants 3 jours.", "title": "Boost de certitude"},
			"2": {"id": 2, "price": (2 * level), "description": "Choisis un code hexadécimal pour la nouvelle couleur de ton pseudo (dure une semaine) ", "title": "Couleur personnalisée"}
			};
			if (!args[0])
			{
				let menu = new Discord.RichEmbed()
					.addField("Le Store Certifié de " + author.username, "_envoie_ `stp jachete` _suivi du chiffre correspondant à ce que tu veux acheter_");
				for (var number in stock)
				{
					let item = stock[number];
					menu.addField(`__${item.id}__ ${item.title} (${item.price} certithunes)`, item.description);
				}
				return (message.channel.send(menu));}
			con.query(`SELECT * FROM certithunes WHERE id = '${author.id}' AND guild = '${message.guild.id}'`, (err, row) =>
					{
					if (err)
					console.error(error);
					if (!row[0])
					certithunes = 0;
					else
					certithunes = row[0].amount;
					itemId = args[0];
					if (stock[itemId] === undefined)
					{
					return (message.reply("C'est invalide ce que tu me dis"));
					}
					if (certithunes < stock[itemId].price)
					{
					return (message.reply("mdr t'as pas assez de thunes"));
					}
					else
					{
					let now = new Date();
					let limit;
					if (itemId == 1)
						limit = new Date().setDate(now.getDate() + 3);
					else if (itemId == 2)
					{
						limit = new Date().setDate(now.getDate() + 7);
						if (typeof args[1] !== "string" || args[1].length !== 6 ||  isNaN(parseInt(args[1], 16)))
							return message.reply("ton code couleur est pas bon, c'est sous la forme aabbcc");
						else {
							message.guild.createRole({
								name: message.author.username,
								color: args[1],
								mentionable: 0
							})
								.then(role => {
									let rolePosition = -2;
									message.guild.roles.forEach(role => rolePosition++);
									role.setPosition(rolePosition);
									message.member.addRole(role);
									setTimeout(() => role.delete("timeout"), 7 * 24 * 3600 * 1000);
								})
								.catch(console.error);
						}
					}
					else {
						return message.reply("C'est pas encore dispo pour l'instant ma gueule, reviens bientôt ou paye le dev ? PEUT ETRE QU'IL CODERAIT PLUS VITE S'IL ÉTAIT PAYÉ AUSSI LA PUTAIN DE SA RACE");
					}
					console.log('bought item ' + itemId);
					con.query(`SELECT * FROM shop WHERE userID = '${message.author.id}' AND guildID = '${message.guild.id}' AND itemID = '${itemId}'`, (error, items) =>
							{
							if (error)
							console.error(e);
							let sql = (`UPDATE certithunes SET amount = amount - ${stock[itemId].price} WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`);
							let msg = `tu viens d'acheter 1 ${stock[itemId].title}`;
							if (!items[0])
							{
							con.query(`INSERT INTO shop (userID, guildID, itemID, boughtOn, expiresOn) VALUES ('${message.author.id}', '${message.guild.id}', '${itemId}', '${now}', '${limit}' )`, (e) =>
									{
									if (e)
									console.error(e);
									con.query(sql, (errs) =>
											{
											if (errs)
											console.error(errs);
											return message.reply(msg)
											});
									});
							}
							else
							{
								con.query(`UPDATE shop SET expiresOn = '${limit}' WHERE userID = '${message.author.id}' AND guildID = '${message.guild.id}' AND itemID = '${itemId}'`, (e) =>
										{
										if (e)
										console.error(e);
										con.query(sql, (errs) =>
												{
												if (errs)
												console.error(errs);
												return message.reply(msg)
												});
										});
							}
							});
					}
					});
			});
}

module.exports.help = {
name: 'jachete',
	  description: 'Tu veux acheter un bail ?',
	  examples: 'stp jachete'
}
