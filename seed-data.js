const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

const dataPolitician = fs.readFileSync('./politicians.csv', 'utf8').split('\n').map(x => x.split(","))
const dataVoters = fs.readFileSync('./voters.csv','utf8').split('\n').map(x=> x.split(","))
const dataVotes  = fs.readFileSync('./votes.csv','utf8').split('\n').map(x=> x.split(","))
// console.log(dataPolitician)

db.serialize(function () {
    let statement = db.prepare(`INSERT INTO politicians VALUES(null,?,?,?,?)`)
    for (let i = 1; i < dataPolitician.length-1; i++) {
        statement.run(dataPolitician[i])
    }
    statement.finalize(function(err){
        if(err){
            console.log(err)
        } else{
            console.log(`data berhasil dimasukan ke database`)
        }
    })
})

db.serialize(function () {
    let statement = db.prepare(`INSERT INTO voters VALUES(null,?,?,?,?)`)
    for (let i = 1; i < dataVoters.length-1; i++) {
        statement.run(dataVoters[i])
    }
    statement.finalize(function(err){
        if(err){
            console.log(err)
        } else{
            console.log(`data berhasil dimasukan ke database`)
        }
    })
})

db.serialize(function () {
    let statement = db.prepare(`INSERT INTO votes VALUES(null,?,?)`)
    for (let i = 1; i < dataVotes.length-1; i++) {
        statement.run(dataVotes[i])
    }
    statement.finalize(function(err){
        if(err){
            console.log(err)
        } else{
            console.log(`data berhasil dimasukan ke database`)
        }
    })
})