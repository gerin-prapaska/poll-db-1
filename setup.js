//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./voters.db')

// console.log(db)
db.serialize(() => {

  db.run('DROP TABLE IF EXISTS voters')
  db.run('DROP TABLE IF EXISTS politicians')
  db.run('DROP TABLE IF EXISTS votes')

  db.run(`CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
  );`, (err) => {
    if(err) {console.log('Error')} 
    else {console.log('voters done!')}
  })

  db.run(`CREATE TABLE IF NOT EXISTS politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current INTEGER
  );`, (err) => {
    if(err) {console.log('Error')} 
    else {console.log('politicians done!')}
  })

  db.run(`CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY (voterId) REFERENCES voters (id),
    FOREIGN KEY (politicianId) REFERENCES politicians (id)
  );`, (err) => {
    if(err) {console.log('Error')} 
    else {console.log('votes done!')}
  })
})
db.close()