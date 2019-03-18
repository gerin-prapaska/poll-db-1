const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.serialize(() => {
    let Politician = `
    CREATE TABLE Politicians
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current INTEGER
    )
    `

    let Voters = `
    CREATE TABLE Voters
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
    )
    `

    let Votes = `
    CREATE TABLE Votes
    (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     voterId INTEGER,
     politicianId INTEGER,
     FOREIGN KEY (voterId) REFERENCES Voters(id),
     FOREIGN KEY (politicianId) REFERENCES Politician(id)
    )
    `

    db.run(Politician, (err) =>{
      err ? console.log('error') : console.log('Data Politician')
    })

    db.run(Voters, (err) => {
      err ? console.log('error') : console.log('Data Voter')
    })

    db.run(Votes, (err) => {
      err ? console.log('error') : console.log('Data Votes')
    })

})

db.close()