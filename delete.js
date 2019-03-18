const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const command = process.argv.slice(2);
const query = `DELETE FROM ${command[0]} WHERE id=${command[1]}`;

db.run(query , function(err){
    if(err)console.log(err);
    else console.log(`delete berhasil!`);
})