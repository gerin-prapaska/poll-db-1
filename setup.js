//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll2.db')

let politician =    `CREATE TABLE politician(
                        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                        name TEXT,
                        party TEXT,
                        lokasi TEXT,
                        grade_current INTEGER
                     )`

let voters =        `CREATE TABLE voters (
                        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                        first_name TEXT,
                        last_name TEXT,
                        gender TEXT,
                        age INTEGER
                     )`

let voter_politician =  `CREATE TABLE voter_politician (
                            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                            voterId INTEGER,
                            politicianId INTEGER
                         )`

db.run(politician)
db.run(voters)
db.run(voter_politician)

db.close()