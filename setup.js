//your code here
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

const createPoliticians = `
  CREATE TABLE IF NOT EXISTS Politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL    
)`;

const createVoters = `
  CREATE TABLE IF NOT EXISTS Voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
)`;



db.serialize(function() {
  db.run(createPoliticians, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Politicians table successfully created");
    }
  });

  db.run(createVoters, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Voters table successfully created");
    }
  });

  const createVotes = `
    CREATE TABLE IF NOT EXISTS Votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voter_id INTEGER,
      politician_id INTEGER,
        FOREIGN KEY (voter_id) REFERENCES Voters(id),
        FOREIGN KEY (politician_id) REFERENCES Politicians(id)
  )`;
      
  db.run(createVotes, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Votes table successfully created");
    }
  });
});

db.close();