const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll2.db')

const fs = require('fs')
const politicianList = (fs.readFileSync('./politicians.csv','utf-8')).split('\n').slice(1)
const voterList = (fs.readFileSync('./voters.csv','utf-8')).split('\n').slice(1)
const voteList = (fs.readFileSync('./votes.csv','utf8')).split('\n').slice(1)

db.serialize(() => {
    for(let i = 0; i < politicianList.length; i++){
        let temp = politicianList[i].split(',')
        db.run     (`INSERT INTO politician (id,name,party,lokasi,grade_current)
                     VALUES (null,'${temp[0]}','${temp[1]}','${temp[2]}','${temp[3]}');`)
    }

    for(let i = 0; i < voterList.length; i++){
        let temp = voterList[i].split(',')
        db.run     (`INSERT INTO voters (id,first_name,last_name,gender,age)
                     VALUES (null,"${temp[0]}","${temp[1]}","${temp[2]}","${temp[3]}");`)
    }

    for(let i = 0; i < voteList.length; i++){
        let temp = voteList[i].split(',')
        db.run     (`INSERT INTO voter_politician (id,voterId,politicianId)
                     VALUES (null,'${temp[0]}','${temp[1]}');`)
    }
})
db.close()

