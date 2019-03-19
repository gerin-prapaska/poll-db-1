const  sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('./database.db');
const fs = require('fs')
let dataPol = fs.readFileSync('./politicians.csv','utf8').split('\n').slice(1).map(el=>el.split(','))
let dataVoters = fs.readFileSync('./voters.csv','utf8').split('\n').slice(1).map(el=>el.split(','))
let dataVoting = fs.readFileSync('./votes.csv','utf8').split('\n').slice(1).map(el=>el.split(','))

// console.log(dataVoting)
db.serialize(function(){
    let stmtPol = db.prepare(`INSERT INTO Politicians(name,party,location,grade_current)
    VALUES (?,?,?,?) `)
    for (let i = 0; i < dataPol.length; i++) {
        stmtPol.run(dataPol[i][0],dataPol[i][1],dataPol[i][2],dataPol[i][3])
    }
    stmtPol.finalize((err)=>{
        if(err) {
            console.log(err)
        }else {
            console.log(`insert into politicians berhasil`)
        }
    })
})

db.serialize(function(){
    let stmtVoters = db.prepare(`INSERT INTO Voters(first_name,last_name,gender,age)
    VALUES (?,?,?,?) `)
    for (let i = 0; i < dataVoters.length; i++) {
        stmtVoters.run(dataVoters[i][0],dataVoters[i][1],dataVoters[i][2],dataVoters[i][3])
    }
    stmtVoters.finalize((err)=>{
        if(err) {
            console.log(err)
        }else {
            console.log(`insert into voters berhasil`)
        }
    })
})

db.serialize(function(){
    let stmtVoting = db.prepare(`INSERT INTO Votes(votersId,politiciansId)
    VALUES (?,?) `)
    for (let i = 0; i < dataVoting.length; i++) {
        stmtVoting.run(dataVoting[i][0],dataVoting[i][1])
    }
    stmtVoting.finalize((err)=>{
        if(err) {
            console.log(err)
        }else {
            console.log(`insert into votes berhasil`)
        }
    })
})
db.close();