//your code here
const db = require('./db')

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS Politicians`)
  db.run(`DROP TABLE IF EXISTS Voters`)
  db.run(`DROP TABLE IF EXISTS Votes`)

  let createPoliticians = `
    CREATE TABLE IF NOT EXISTS Politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    party TEXT NOT NULL,
    location TEXT NOT NULL,
    grade_current REAL
  )`
  
  let createVoters = `
    CREATE TABLE IF NOT EXISTS Voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL
  )`
  
  let createVotes = `
    CREATE TABLE IF NOT EXISTS Votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    politicianId INTEGER,
    voterId INTEGER,
    FOREIGN KEY (politicianId) REFERENCES Politicians (id),
    FOREIGN KEY (voterId) REFERENCES Voters (id)
  )`

  db.run(createPoliticians, (err) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log('Successfully new table politicians')
    }
  })
  
  db.run(createVoters, (err) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log('Successfully new table voters')
    }
  })
  
  db.run(createVotes, (err) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log('Successfully new table votes')
    }
  })
})