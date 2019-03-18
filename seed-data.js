const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const fs = require('fs')


db.serialize(() => {
    let dataPolitician = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1)
    for(let i = 0; i < dataPolitician.length; i++){
        let newData = dataPolitician[i].split(',')
        let queryPolitician = `
        INSERT INTO Politicians
        (name,party,location,grade_current)
        VALUES
        ('${newData[0]}','${newData[1]}','${newData[2]}','${newData[3]}')
        `
        db.run(queryPolitician, err => {
            err ? console.log('error') : console.log('Politician')
        })
    }

    let dataVoter = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1)
    for(let i = 0; i < dataVoter.length; i++){
        let newData = dataVoter[i].split(',')
        let queryVoter = `
        INSERT INTO Voters
        (first_name,last_name,gender,age)
        VALUES
        ('${newData[0]}','${newData[1]}','${newData[2]}','${newData[3]}')
        `
        db.run(queryVoter, err => {
            err ? console.log('error') : console.log('Data Voters')
        })
    }

    let dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1)
    for(let i = 0; i < dataVotes.length; i++){
        let newData = dataVotes[i].split(',')
        let queryVotes = `
        INSERT INTO Votes
        (voterId,politicianId)
        VALUES
        ('${newData[0]}', '${newData[1]}')
        `
        db.run(queryVotes, err => {
            err ? console.log('error') : console.log('Data Votes')
        })
    }
})

db.close()