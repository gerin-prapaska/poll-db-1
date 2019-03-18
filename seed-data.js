const fs = require('fs')
const db = require('./setup.js')

let politiciansData = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
let votersData = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let votesData = fs.readFileSync('./votes.csv', 'utf8').split('\n')

for(let i = 1; i < politiciansData.length; i++) {
    if(politiciansData[i] !== '') {
        let tempData = politiciansData[i].split(',')
        db.serialize(function() {
            db.run(`INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ("${tempData[0]}", "${tempData[1]}", "${tempData[2]}", ${tempData[3]})`, function(err) {
                        if(err) throw err
                    })
        })
    }
}

for(let i = 1; i < votersData.length; i++) {
    if(votersData[i] !== '') {
        let tempData = votersData[i].split(',')
        db.serialize(function() {
            db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                    VALUES ("${tempData[0]}", "${tempData[1]}", "${tempData[2]}", ${tempData[3]})`, function(err) {
                        if(err) throw err
                    })
        })
    }
}

for(let i = 1; i < votesData.length; i++) {
    if(votesData[i] !== '') {
        let tempData = votesData[i].split(',')
        db.serialize(function() {
            db.run(`INSERT INTO votes (voterId, politicianId)
                    VALUES (${tempData[0]}, ${tempData[1]})`, function(err) {
                        if(err) throw err
                    })
        })
    }
}