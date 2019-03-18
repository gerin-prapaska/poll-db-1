//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('poll-db-1.db')

//create all tables
let createPoliticians = 
`CREATE TABLE IF NOT EXISTS politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
);`

let createVoters = 
`CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
);`

let createVotes = 
`CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voter_id INTEGER,
    politician_id INTEGER, 
    FOREIGN KEY (voter_id) REFERENCES voters(id),
    FOREIGN KEY (politician_id) REFERENCES politicians(id)
);`

db.serialize(() => {
    // clear previous table configs
    db.run('DROP TABLE IF EXISTS politicians;',(err) => {
    })
    db.run('DROP TABLE IF EXISTS voters;',(err) => { 
    })
    db.run('DROP TABLE IF EXISTS votes;',(err) => {  
    })
    db.run(createPoliticians, (err) => {
        if(err) throw err;
        console.log(`create politicians table success!`)
    });
    
    db.run(createVoters, (err) => {
        if(err) throw err;
        console.log(`create voters table success!`)
    });
    
    db.run(createVotes, (err) => {
        if(err) throw err;
        console.log(`create votes table success!`)
    });
})

db.close((err) => {
    if(err) throw err
    console.log('Database close');
})

module.exports = db;