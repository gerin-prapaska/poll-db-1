//your code here
const db = require("./db")

const createPoliticiansTableQuery =
`CREATE TABLE Politicians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  party TEXT,
  location TEXT,
  grade_current REAL
);`

const createVotersTableQuery =
`CREATE TABLE Voters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  age INTEGER
);`

const createVotesTableQuery =
`CREATE TABLE Votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  VoterId INTEGER,
  PoliticianId INTEGER
);`

db.serialize(() => {
  db.run(createPoliticiansTableQuery, err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log("Politicians table was successfully created!");
    }
  })

  db.run(createVotersTableQuery, err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log("Voters table was successfully created!");
    }
  })

  db.run(createVotesTableQuery, err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log("Votes table was successfully created!");
    }
  })
})

db.close()