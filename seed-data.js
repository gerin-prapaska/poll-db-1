const db = require('./setup.js')
const fs = require('fs')


db.serialize(function(){
    let readFile = []
    let input = ''

    readFile = fs.readFileSync('./politicians.csv','utf8').split('\n')
    readFile = readFile.map(data => data.split(','))

    input = db.prepare(`INSERT INTO Politicans (name,party,location,grade_current) VALUES (?,?,?,?)`)

    for(let i=1;i<readFile.length-1;i++){
        input.run(`${readFile[i][0]}`,`${readFile[i][1]}`,`${readFile[i][2]}`,`${readFile[i][3]}`)
    }
    
    input.finalize()


    readFile = fs.readFileSync('./voters.csv','utf8').split('\n')
    readFile = readFile.map(data => data.split(','))

    input = db.prepare(`INSERT INTO Voters (first_name,last_name,gender,age) VALUES (?,?,?,?)`)

    for(let i=1;i<readFile.length-1;i++){
        input.run(`${readFile[i][0]}`,`${readFile[i][1]}`,`${readFile[i][2]}`,`${readFile[i][3]}`)
    }
    
    input.finalize()

    readFile = fs.readFileSync('./votes.csv','utf8').split('\n')
    readFile = readFile.map(data => data.split(','))

    input = db.prepare(`INSERT INTO Votes (voterId,politicianId) VALUES (?,?)`)

    for(let i=1;i<readFile.length-1;i++){
        input.run(`${readFile[i][0]}`,`${readFile[i][1]}`)
    }
    
    input.finalize()

})

