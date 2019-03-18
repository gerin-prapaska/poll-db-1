const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');

const createPoliticiansTable = `CREATE TABLE IF NOT EXISTS "politicians" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"party"	TEXT,
	"location"	TEXT,
	"grade_current"	REAL
);`;


const createVotersTable = `CREATE TABLE IF NOT EXISTS "voters" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"gender"	TEXT,
	"age"	INTEGER
);`;

const createVotesTable = `CREATE TABLE IF NOT EXISTS "votes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"voterId" INTEGER,
	"politicianID" INTEGER,
	FOREIGN KEY("voterId") REFERENCES voters(id),
	FOREIGN KEY("politicianId")	REFERENCES politicians(id)
);`;

db.run(createPoliticiansTable);
db.run(createVotersTable);
db.run(createVotesTable);
// db.close();

module.exports = db;