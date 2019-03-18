const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('appVote.db');
const fs = require('fs')

db.serialize(function(){
    // let insertPoliticians = db.prepare(`INSERT INTO politicians VALUES (null, ?, ?, ?, ?)`)
    // let dataPoliticians = fs.readFileSync('./politicians.csv','utf8').split('\n')
    // for(let i=1; i<dataPoliticians.length; i++){
    //     dataPoliticians[i] = dataPoliticians[i].split(',')
    //     insertPoliticians.run(dataPoliticians[i][0],dataPoliticians[i][1],dataPoliticians[i][2],dataPoliticians[i][3]);
    // }
    // insertPoliticians.finalize((err)=>{
    //     if(err) console.log('input politicians error')
    //     else console.log('success')
    // })



    // let insertVoters = db.prepare(`INSERT INTO voters VALUES (null, ?, ?, ?, ?)`)
    // let dataVoters = fs.readFileSync('./voters.csv','utf8').split('\n')
    // for(let i=1; i<dataVoters.length; i++){
    //     dataVoters[i] = dataVoters[i].split(',')
    //     insertVoters.run(dataVoters[i][0],dataVoters[i][1],dataVoters[i][2],dataVoters[i][3]);
    // }
    // insertVoters.finalize((err)=>{
    //     if(err) console.log('input voters error')
    //     else console.log('success');
    // })

    

    let insertVotes = db.prepare(`INSERT INTO votes VALUES (null, ?, ?)`)
    let dataVotes = fs.readFileSync('./votes.csv','utf8').split('\n')
    for(let i=1; i<dataVotes.length; i++){
        dataVotes[i] = dataVotes[i].split(',')
        insertVotes.run(dataVotes[i][0], dataVotes[i][1]);
    }
    insertVotes.finalize((err)=>{
        if(err) console.log('input votes error')
        else console.log('success');
    })

})

db.close()