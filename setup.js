//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db')

db.run('DROP TABLE IF EXISTS voters', (err)=> {if (err)throw err})
db.run('DROP TABLE IF EXISTS politicians', (err)=> {if (err)throw err})
db.run('DROP TABLE IF EXISTS votes', (err)=> {if (err)throw err})

const createTablePoliticians = `CREATE TABLE IF NOT EXISTS "politicians" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "party" TEXT,
    "location" TEXT,
    "gradeCurrent" REAL
    )
    `

db.run(createTablePoliticians, (err) => {
    if(err) throw err
    console.log(`create politicians table success`)
});


const createTableVoters = `CREATE TABLE IF NOT EXISTS "voters" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" TEXT,
    "age" INTEGER
)`

db.run(createTableVoters, (err) => {
    if(err) throw err
    console.log(`create voters table success`)
});


const createTableVotes = `CREATE TABLE IF NOT EXISTS "votes" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER,
    "politicianId" INTEGER,
    FOREIGN KEY ("voterId") REFERENCES voters(id)
    FOREIGN KEY ("politicianId") REFERENCES politicians(id)
)`

db.run(createTableVotes, (err) => {
    if(err) throw err
    console.log(`create votes table success`)
});

module.exports = {
    db: db,
    sqlite3:sqlite3
}