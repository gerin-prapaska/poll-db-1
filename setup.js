//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./polldb.db');

const createPoliticians = `CREATE TABLE IF NOT EXISTS politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
);`;
const createVoters = `CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
);`;
const createVotes = `CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER NOT NULL, 
    politicianId INTEGER NOT NULL,
    FOREIGN KEY (voterId) REFERENCES voter(id),
    FOREIGN KEY (politicianId) REFERENCES politicians(id)

);`;

function logErr(err) {
    if (err) console.log('gagal dibuat', err);
    else console.log('berhasil dibuat');
}

db.serialize(function() {
    db.run('DROP TABLE IF EXISTS politicians');
    db.run('DROP TABLE IF EXISTS voters');
    db.run('DROP TABLE IF EXISTS votes');

    db.run(createPoliticians, logErr);
    db.run(createVoters, logErr);
    db.run(createVotes, logErr);
});

db.close();