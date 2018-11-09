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

function cleanDate(date) {
	var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	if (hours < 10)
		hours = '0' + hours;
	if (minutes < 10)
		minutes = '0' + minutes;
	return day + ' ' + monthNames[monthIndex] + ' à ' + hours+'h'+minutes;
}


module.exports.run = async (bot, message, args) => {
	let xp;
	let level;
	con.query(`SELECT * FROM experience WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, exprow) =>
			{
			if (err)
			throw err;
			if (!exprow[0])
			xp = 0;
			else
			xp = exprow[0].xp;
			level = 1;
			let xpPool = 1234;
			while (xp >= xpPool)
			{
			level++;
			xp = xp - xpPool;
			xpPool = 1.5 * xpPool;
			}
			let thunes = parseFloat(((Math.random() * 2) + 2) + level).toFixed(2);
			let nowDate = new Date();
			let today = nowDate.getDay();
			if (today == 4)
			thunes = parseFloat(parseFloat(thunes) * 2).toFixed(2);
			else
				console.log("regular day, no certithune bonus");
			timeNow = parseInt(Date.now());

			con.query(`SELECT * FROM certithunes WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, rows) =>
					{
					let msg ="";
					if (err)
					throw err;
					if (!rows[0])
					{
					msg = "Tu viens de gagner "+parseFloat(thunes)+" certithunes";
					sql = `INSERT INTO certithunes (id, amount, guild, lastCollected, requests) VALUES ('${message.author.id}', '${thunes}', '${message.guild.id}', '${timeNow}', 0)`;
					}
					else
					{
					cooldown = new Date(parseInt(rows[0].lastCollected));
					let total = parseFloat(parseFloat(rows[0].amount) + parseFloat(thunes));
					if (nowDate.setHours(0,0,0,0) == cooldown.setHours(0,0,0,0))
					{
					if (rows[0].requests < 5)
					{
					sql = `UPDATE certithunes SET requests = ${rows[0].requests + 1} WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
					msg = `T'as déjà pris tes certithunes aujourd'hui, essaie encore ${ 5 - rows[0].requests} fois et je t'enleve 20 certicentime.(attends jusqu'à demain)`;
					}
					else if (rows[0].requests == 5)
					{
						msg = "c'est bon tu m'as soulé. -20 certicentimes pour "+message.author;
						sql = `UPDATE certithunes SET requests = ${rows[0].requests + 1} , amount = '${rows[0].amount - 0.20}' WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
					}
					else
						msg = "t'en as pas déjà eu assez ? reviens le demain, j'vais pas te dépouiller quand meme...";
					}
					else
					{
						msg = "Tu viens de gagner "+thunes+" certithunes, reviens demain !";
						sql = `UPDATE certithunes SET amount = '${total}', lastCollected = '${timeNow}', requests = 0 WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
					}
					}
					con.query(sql, (err) =>
							{
							if (err)
							throw err;
							return message.reply(msg);
							});
					});
			});
}

module.exports.help = {
name: 'certithune',
	  description: 'récupere ton pécule journalier maggle, faut bien se faire des certithunes',
	  examples: 'stp certithune'
}
