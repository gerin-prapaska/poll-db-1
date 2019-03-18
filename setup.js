const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.serialize(function(){

    db.run('DROP TABLE IF EXISTS Politicans')
    db.run('DROP TABLE IF EXISTS Votes')
    db.run('DROP TABLE IF EXISTS Voters')


    db.run('CREATE TABLE IF NOT EXISTS Politicans (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,name TEXT ,party TEXT,location TEXT ,grade_current REAL)',(err) => {
        if(err) throw err
        console.log('berhasil')
    })  
    
    db.run('CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,first_name TEXT,last_name TEXT,gender TEXT,age INTEGER)',(err) => {
        if(err) throw err
        console.log('berhasil create Voters')
    })

    db.run('CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,voterId INTEGER ,politicianId INTEGER,  FOREIGN KEY (voterId) REFERENCES Voters(voterId), FOREIGN KEY (politicianId) REFERENCES Politicans(politicianId) )',(err) => {
        if(err) throw err
        console.log('berhasil create votes')
    })

})

module.exports = db