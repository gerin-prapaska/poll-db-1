//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Politicians`, (err) => {
        (err) ? console.log(err) : console.log(`SUCCESSFULLY DROP Politicians`)
    })
    db.run(`DROP TABLE IF EXISTS Voters`, (err) => {
        (err) ? console.log(err) : console.log(`SUCCESSFULLY DROP Voters`)
    })
    db.run(`DROP TABLE IF EXISTS Votes`, (err) => {
        (err) ? console.log(err) : console.log(`SUCCESSFULLY DROP Votes`)
    })
    //create politicians table..
    let create_politicians_table = 
    `CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current INTEGER
    )`
    db.run(create_politicians_table, (err) => {
        (err) ? console.log(err) : console.log(`Success to create a Politicians Table...`)
    })

    //create voters table..
    let create_voters_table =
    `CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`
    db.run(create_voters_table, (err) => {
        (err) ? console.log(err) : console.log(`Success to create a Voters Table...`)
    })

    //create votes table..
    let create_votes_table = 
    `CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
                FOREIGN KEY (voterId) REFERENCES Voters (id),
                FOREIGN KEY (politicianId) REFERENCES Politicians (id)
    )`
    db.run(create_votes_table, (err) => {
        (err) ? console.log(err) : console.log(`Success to create a Votes Table...`)
    })
})

module.exports = db;