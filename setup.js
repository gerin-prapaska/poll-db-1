//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./appVote.db')

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
        )`, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('success')
            }
        })

    db.run(`CREATE TABLE IF NOT EXISTS voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firtsName TEXT,
        lastName TEXT,
        gender TEXT,
        AGE INTEGER
        )`, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('success')
            }
        })

    db.run(`CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        voterId INTEGER,
        politicianId INTEGER,
            FOREIGN KEY (voterId) REFERENCES voter(id),
            FOREIGN KEY (politicianId) REFERENCES politicians(id)
        )`, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('success')
            }
        })

})


db.close()