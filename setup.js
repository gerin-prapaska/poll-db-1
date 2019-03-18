const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

const logError = err => { if (err) console.log(err) }

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    );`, logError)

    db.run(`CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    );`, logError)

    db.run(`CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER NOT NULL,
        politicianId INTEGER NOT NULL,
        FOREIGN KEY (voterId) REFERENCES Voters(id),
        FOREIGN KEY (politicianId) REFERENCES Politicians(id)
    );`, logError)
})

db.close()