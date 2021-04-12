// const mysql = require('mysql')
// const config = require('./config.json')

// var con = mysql.createConnection({
  // host: config.dbHost,
  // user: config.dbUser,
  // password: config.dbPassword,
  // database: config.dbName
// })


let level = 1
let experience = 600
while (level < 31)
{
    experience += Math.floor((Math.exp(Math.log(level) * 0.5) * 1200) + (Math.exp(Math.log(level - 1) * 0.5) * 1200))
    console.log('('+ level + ',' + experience +')');
    // con.query(`INSERT INTO experiencetolevel(level, experience) VALUES ('${level}', '${experience}')`, (err, rows) => {if (err) { throw err }})
    level++;
}