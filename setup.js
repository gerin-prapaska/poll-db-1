//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polling.db')


//Create Tabel politicians
const queryPoliticians = `CREATE TABLE IF NOT EXISTS "politicians" (
                "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
                "name"	TEXT,
                "party"	TEXT,
                "location"	TEXT,
                "gradeCurrent"	REAL
);`
    db.run(queryPoliticians,function(err){
        if(err){
            console.log("create failed")
        }else{
            console.log("sukses create table")
        }
    })

//Create Table voters
const queryVoters = `CREATE TABLE IF NOT EXISTS "voters" (
    "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
    "first_name"	TEXT,
    "last_name"	TEXT,
    "gender"	TEXT,
    "age"	INTEGER
);`
    db.run(queryVoters,function(err){
        if(err){
            console.log("create failed")
        }else{
            console.log("sukses create table")
        }
    })

// Create Tabel votes
const queryVotes = `CREATE TABLE IF NOT EXISTS "votes" (
    "voterId" INTEGER,
    "politicianId"	INTEGER,
        FOREIGN KEY (politicianId) REFERENCES politicians(id),
        FOREIGN KEY (voterId) REFERENCES voters(id)
);`
    db.run(queryVotes,function(err){
        if(err){
            console.log("create failed")
        }else{
            console.log("sukses create table")
        }
    })