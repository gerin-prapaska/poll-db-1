//your code here
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db')

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    )`, (err) => {
        if (err) console.log(err)
        else {
            console.log('creation of politician table has been successful.')
        }
    })
})

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`, (err) => {
        if (err) console.log(err)
        else {
            console.log(`creation of voters tabel has been successful.`)
        }
    })
})

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER
    )`, (err) => {
        if (err) console.log(err)
        else {
            console.log(`creation of votes table has been successful.`)
        }
    })
})

db.close((err) =>{
    if (err){
        console.log(err)
    }else {
        console.log('success')
    }
})

module.exports = db