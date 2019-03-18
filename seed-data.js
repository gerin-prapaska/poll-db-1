// REQUIREMENTS
const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
// REQUIREMENTS

// EXTERNAL DATA
const fs = require('fs')
const voters = fs.readFileSync('./voters.csv' , 'utf8').split('\n').slice(1)
const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1)
const votes = fs.readFileSync('./votes.csv' , 'utf8').split('\n').slice(1)
// EXTERNAL DATA

// INSERT POLITCIANS
db.serialize(function (err) {
    if(err)console.log(err);
    else {
        var insert = db.prepare('INSERT INTO politicians VALUES (null,?,?,?,?)')
        for (let i = 0 ; i < politicians.length - 1 ; i++){
            insert.run(`${politicians[i].split(',')[0]}`,`${politicians[i].split(',')[1]}`,`${politicians[i].split(',')[2]}`,`${politicians[i].split(',')[3]}`)
        }
        insert.finalize()
        console.log('insert politicians berhasil!');
    }
})
// INSERT POLITCIANS

// INSERT VOTERS
db.serialize(function(err){
    if(err)console.log(err);
    else {
        var insert = db.prepare('INSERT INTO voters VALUES (null,?,?,?,?)')
        for(let i = 0 ; i < voters.length - 1 ; i++){
            insert.run(`${voters[i].split(',')[0]}`,`${voters[i].split(',')[1]}`,`${voters[i].split(',')[2]}`,`${voters[i].split(',')[3]}`)
        }
        insert.finalize()
        console.log('insert voters berhasil!');
    }
})
// INSERT VOTERS

// INSERT VOTES
db.serialize(function(err){
    if(err)console.log(err);
    else{
        var insert = db.prepare('INSERT INTO votes VALUES (null,?,?)')
        for(let i = 0 ; i < votes.length - 1 ;i++){
            insert.run(`${votes[i].split(',')[0]}`,`${votes[i].split(',')[1]}`)
        }
        insert.finalize()
        console.log('insert votes berhasil!');
    }
})
// INSERT VOTES