// REQUIREMENTS & EXTERNAL DATA
const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
// REQUIREMENTS & EXTERNAL DATA

// POLITICIANS
const createPoliticiansTable = `
    CREATE TABLE IF NOT EXISTS politicians (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	party TEXT,
	location TEXT,
	grade_current REAL
);`
db.run(createPoliticiansTable, function(err){
    if(err)console.log(err);
    else console.log('create tabel politicians berhasil');
})
// POLITICIANS

// VOTERS
const createVotersTable = `
    CREATE TABLE IF NOT EXISTS voters (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT,
	last_name TEXT,
	gender TEXT,
	age INTEGER
);`
db.run(createVotersTable , function(err){
    if(err)console.log(err);
    else console.log('create tabel voters berhasil');
})
// VOTERS

// VOTES
const createVotesTable = `
    CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY ("voterId") REFERENCES voters(id)
    FOREIGN KEY ("politicianId") REFERENCES politician(id)
);`
db.run(createVotesTable , function(err){
    if(err)console.log(err);
    else console.log(`create tabel votes berhasil`);  
})
// VOTES