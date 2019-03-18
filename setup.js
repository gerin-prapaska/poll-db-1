//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

const politicians = `CREATE TABLE politicians (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	name	TEXT,
	party	TEXT,
	location	TEXT,
	grade_current	REAL
)`

const voters = `CREATE TABLE voters (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name	TEXT,
	last_name	TEXT,
	gender	TEXT,
	age	INTEGER
)`

const votes = `CREATE TABLE votes (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	voterId INTEGER,
	politicianId    INTEGER,
    FOREIGN KEY (voterId) REFERENCES voters(id)
    FOREIGN KEY (politicianId) REFERENCES politicians(id)
)`

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS politicians`, function (err) { (err) ? console.log(err.message) : console.log('TABLE POLITICIANS DROPPED') })
    db.run(`DROP TABLE IF EXISTS voters`, function (err) { (err) ? console.log(err.message) : console.log('TABLE VOTERS DROPPED') })
    db.run(`DROP TABLE IF EXISTS votes`, function (err) { (err) ? console.log(err.message) : console.log('TABLE VOTES DROPPED') })
    db.run(politicians, function (err) { (err) ? console.log(err.message) : console.log('TABLE POLITICIANS READY') })
    db.run(voters, function (err) { (err) ? console.log(err.message) : console.log('TABLE VOTERS READY') })
    db.run(votes, function (err) { (err) ? console.log(err.message) : console.log('TABLE VOTES READY') })
})