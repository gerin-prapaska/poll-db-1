//your code here
const  sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('./database.db');

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        party TEXT,
        location TEXT, 
        grade_current INTEGER);`,(err)=>{
            if(err) {
                console.log (err)
            }else {
                console.log(`create table Politicians berhasil`)
            }
        });
    
    db.run(`CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT, 
        last_name TEXT, 
        gender TEXT,
        age INTEGER);`, (err)=>{
            if (err) {
                console.log (err)
            }else {
                console.log(`create table Voters berhasil`)
            }
        });

    db.run(`CREATE TABLE IF NOT EXISTS Votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        votersId INTEGER,
        politiciansId INTEGER,
        FOREIGN KEY(votersId) REFERENCES voters(id),
        FOREIGN KEY(politiciansId) REFERENCES politicians(id));`,(err)=>{
            if(err) {
                console.log (err)
            }else {
                console.log(`create table Votes berhasil`)
            }
        });
})
db.close();