const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("./config.json")

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


module.exports = {
addXP: function (message, min, max, cmd)
	   {
		   let experience = Math.floor(Math.random() * (max - min)) + min;
		   let gs = message.guild.roles.find("name", "LesGarsSûrs");
		   if (gs)
		   {
			   gs.members.forEach(gmember =>
					   {
					   if (gmember.id == message.author.id)
					   {
					   experience = 1.5 * experience;
					   console.log(`LesGarsSûrs bonus xp for ${message.author.username}`);
					   }
					   });
		   }
		   let now = new Date();
		   let today = now.getDay();
		   if (today == 4)
			   experience += experience;
		   else
			   console.log("regular day, no bonus");
				con.query(`SELECT * FROM shop WHERE userID = '${message.author.id}' AND guildID = '${message.guild.id}' AND itemID = '1'`, (error, bonus) =>
			{
				if (error)
					console.error(error);
				if (bonus.length < 1)
					console.log("no bonus");
				else {
					let limit = new Date(parseInt(bonus[0].expiresOn));
					if (limit > (new Date()))
					{
						experience += experience;
						console.log("shop bonus, double xp");
					}
					else
						console.log("bonus not available anymore");
				}
				con.query(`SELECT * FROM experience WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
					if (err)
					throw err;
					let sql;
					if (rows.length < 1)
					sql = `INSERT INTO experience (id, xp, guild, lastGain) VALUES ('${message.author.id}', ${experience}, '${message.guild.id}', '${Date.now()}')`;
					else
					{
						let lastGain = rows[0].lastGain;
						let cooldown = parseInt(lastGain) + (60 * 1000);
						if (cooldown >= parseInt(Date.now()) && cmd == 1)
						{
							console.log(`${message.author.username} gained xp too recently`);
							return ;
						}
						let level = 1;
						let Currentxp = rows[0].xp;
						let levelCap = 1234;
						while (Currentxp >= levelCap)
						{
							Currentxp -= levelCap;
							levelCap = levelCap * 1.5;
							level++;
						}
						if (Currentxp + experience >= levelCap)
						{
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
							let levelUpCard = new Discord.RichEmbed()
							.setThumbnail(message.author.avatar)
							.setTitle(`${message.author.username} vient de gagner en certitude !`)
							.addField("Rang : ", rank+prestige)
							.setColor(color);
							message.channel.send(levelUpCard);
						}
						if (level > 1)
							experience = experience * (0.60 * level)
						let total = rows[0].xp + experience;
						console.log(`${message.author.username} gained ${experience}xp`);
						sql = `UPDATE experience SET xp = ${total} , lastGain = '${Date.now()}' WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
						}
						con.query(sql, (e) => {
							if (e)
							throw e;
						});
					});
			});
	   }
}
