const sqlite3  = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

const createPolitician = `CREATE TABLE IF NOT EXISTS politicians(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            party TEXT,
            location TEXT,
            grade_current REAL)`; 

db.serialize(function(){
    db.run(createPolitician, function(err){
        if(err){
            console.log(err)
        } else {
            console.log(`Successfully created a politicians`)
        }
    })
})

const createVoters = `CREATE TABLE IF NOT EXISTS voters (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      first_name TEXT,
                      last_name TEXT,
                      gender TEXT,
                      age INTEGER) `;

db.serialize(function(){
    db.run(createVoters, function(err){
        if(err){
            console.log(err)
        } else {
            console.log(`Successfully created a createVoters`)
        }
    })
})

const createVotes = `CREATE TABLE IF NOT EXISTS votes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    voterId INTEGER ,
                    politicianId INTEGER,
                    FOREIGN KEY(voterId) REFERENCES voters(id)
                    FOREIGN KEY(politicianId) REFERENCES politicians(id))`;


db.serialize(function(){
    db.run(createVotes, function(err){
        if(err){
            console.log(err)
        } else {
            console.log(`Successfully created a createVotes`)
        }
    })
})


