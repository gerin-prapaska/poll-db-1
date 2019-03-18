const APP = require("./app.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db", err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`ghotcha, connected to the database`);
  }
});
/*
name,party,location,grade_current
first_name,last_name,gender,age
voterId,politicianId,
 */

db.serialize(() => {
  const candidate = `CREATE TABLE IF NOT EXISTS candidate(
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      name TEXT NOT NULL,
                      party TEXT,
                      location TEXT,
                      grade_current INTEGER
                      )`;
  const voter = `CREATE TABLE voter(
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  firstName TEXT NOT NULL,
                  lastName TEXT,
                  gender TEXT CHECK(gender in("Male", "Female")),
                  age INTEGER
                  )`;
  const vote = `CREATE TABLE vote(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_voter INTEGER,
                id_candidate INTEGER,
                FOREIGN KEY (id_voter) REFERENCES voter(id),
                FOREIGN KEY (id_candidate) REFERENCES candidate(id)
                )`;
  APP.run(candidate);
  APP.run(voter);
  APP.run(vote);
});
