const db = require('./Database/db')

const createPolitician = `CREATE TABLE IF NOT EXISTS politicians(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  party TEXT,
  location TEXT,
  grade_current REAL
)`

const createVoters = `CREATE TABLE IF NOT EXISTS voters(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  age INTEGER
)`

const createVotes = `CREATE TABLE IF NOT EXISTS votes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  politicianId INTEGER,
  voterId INTEGER,
  FOREIGN KEY (politicianId) REFERENCES politicians(id),
  FOREIGN KEY (voterId) REFERENCES Voter(id)
)`

db.serialize(() => {
  db.run(createPolitician, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Success Create Table Politicians')
    }
  })

  db.run(createVoters, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Success Create Table Voters')
    }
  })

  db.run(createVotes, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Success Create Table Votes')
    }
  })
})