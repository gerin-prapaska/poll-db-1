const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polling.db')
const fs = require('fs')

let dataPoliticians = fs.readFileSync('./politicians.csv','utf8').split("\n")
let newDataPoliticians = []
for (let i = 0 ; i < dataPoliticians.length ; i++){
    newDataPoliticians.push(dataPoliticians[i].split(","))
}

db.serialize(function(){
    let statement = db.prepare("INSERT INTO politicians VALUES (null,?,?,?,?)")
        for (let i = 1 ; i < newDataPoliticians.length ; i++){
            statement.run(newDataPoliticians[i][0],newDataPoliticians[i][1],newDataPoliticians[i][2],newDataPoliticians[i][3]);
        }    
        statement.finalize(function(err){
            if(err){
                console.log("err")
            }else{
                console.log("input sukses")
            }
        })
});

let dataVoters = fs.readFileSync('./voters.csv','utf8').split("\n")
let newdataVoters = []
for (let i = 0 ; i < dataVoters.length ; i++){
    newdataVoters.push(dataVoters[i].split(","))
}

db.serialize(function(){
    let statementVoters = db.prepare("INSERT INTO voters VALUES (null,?,?,?,?)")
        for (let i = 1 ; i < newdataVoters.length ; i++){
            statementVoters.run(newdataVoters[i][0],newdataVoters[i][1],newdataVoters[i][2],newdataVoters[i][3]);
        }    
        statementVoters.finalize(function(err){
            if(err){
                console.log("err")
            }else{
                console.log("input sukses")
            }
        })
});

let dataVotes = fs.readFileSync('./votes.csv','utf8').split("\n")
let newdataVotes = []
for (let i = 0 ; i < dataVotes.length ; i++){
    newdataVotes.push(dataVotes[i].split(","))
}

db.serialize(function(){
    let statementVotes = db.prepare("INSERT INTO votes VALUES (?,?)")
        for (let i = 1 ; i < newdataVotes.length ; i++){
            statementVotes.run(newdataVotes[i][0],newdataVotes[i][1]);
        }    
        statementVotes.finalize(function(err){
            if(err){
                console.log("err")
            }else{
                console.log("input sukses")
            }
        })
});