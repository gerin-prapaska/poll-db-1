//your code here
const db = require('./configdb')

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS Politicians`)
  db.run(`DROP TABLE IF EXISTS Voters`)
  db.run(`DROP TABLE IF EXISTS Votes`)
  db.run(`CREATE TABLE IF NOT EXISTS Politicians (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          party TEXT,
          location TEXT,
          grade_current REAL
  )`)


  db.run(`CREATE TABLE IF NOT EXISTS Voters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          age INTEGER
  )`)
  
  db.run(`CREATE TABLE IF NOT EXISTS Votes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          voterId INTEGER,
          politicianId INTEGER,
          FOREIGN KEY (voterId) REFERENCES Voters(id) ON DELETE CASCADE ON UPDATE NO ACTION
          FOREIGN KEY (politicianId) REFERENCES Politicians(id) ON DELETE CASCADE ON UPDATE NO ACTION
  )`)

})

module.exports = db
