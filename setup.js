//your code here
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./poll.db");

let createPoliticians  = `
CREATE TABLE IF NOT EXISTS politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
)
`

let createVoters  = `
CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
)
`
let createVotes = `
CREATE TABLE IF NOT EXISTS votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voter_id INTEGER,
    politician_id INTEGER,
    FOREIGN KEY(voter_id) REFERENCES voters(id),
    FOREIGN KEY(politician_id) REFERENCES politicians(id)

)
`

function createTable(){
    db.serialize(function(){
        db.run(createPoliticians,function(err){
            if(err) console.log(err, "--Create Politicians--");
        })
        db.run(createVoters,function(err){
            if(err) console.log(err, "--Create Voters--");
        })
        db.run(createVotes,function(err){
            if(err) console.log(err, "--Create Votes--");
        })
    })
}

module.exports = createTable;
