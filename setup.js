//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS politicians(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
        )`, function(err) {
            if(err) {
                throw err
            } else {
                console.log('Successfully created a new table!')
            }
    })
    
    db.run(`CREATE TABLE IF NOT EXISTS voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
        )`, function(err) {
            if(err) {
                throw err
            } else {
                console.log('Successfully created a new table!')
            }
    })
    
    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES voters (id), 
        FOREIGN KEY (politicianId) REFERENCES politicians (id)
        )`, function(err) {
            if(err) {
                throw err
            } else {
                console.log('Successfully created a new table!')
            }
    })
})

module.exports = db