//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    )`)
})

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`)
})

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_voters INT,
        id_politicians INT,
        FOREIGN KEY (id_voters) REFERENCES voters (id),
        FOREIGN KEY (id_politicians) REFERENCES politicians (id)
    )`, function(err){
        if(err){
            console.log(err)

        }else{
            console.log('berhasil');
            

        }

    })
})

module.exports = db