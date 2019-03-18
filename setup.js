// Muhammad Ramadhoni
// p1-w3 poll-db-1

//your code here

const db = require('./db');

db.serialize(() => {
  db.run(
    `DROP TABLE IF EXISTS politicians;`
  )
  db.run(
    `DROP TABLE IF EXISTS voters;`
  )
  db.run(
    `DROP TABLE IF EXISTS votes;`
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS politicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      name TEXT,
      party TEXT,
      location TEXT,
      grade_current REAL
    );`, (err) => {
      if (err) {
        console.log('=== CREATING TABLE "politicians" ERROR! ===');
      } else {
        console.log('Table politicians created!');
      }
    }
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS voters (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      first_name TEXT,
      last_name TEXT,
      gender TEXT,
      age INTEGER
    )`, (err) => {
      if (err) {
        console.log('=== CREATING TABLE "voters" ERROR! ===');
      } else {
        console.log('Table voters created!');
      }
    }
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      voter_id INTEGER,
      politician_id INTEGER
    )`, (err) => {
      if (err) {
        console.log('=== CREATING TABLE "votes" ERROR! ===');
      } else {
        console.log('Table votes created!');
      }
    }
  )
})

db.close();