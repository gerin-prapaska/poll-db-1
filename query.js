//RELEASE 3
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')


db.all(`SELECT name,party,grade_current FROM Politicans WHERE party ='R' AND grade_current BETWEEN 9 AND 11`,(err,data) =>{
    if(err) {
        console.log('==error==',err)
    } else {
        console.table(data)
    }
})

db.all(`SELECT COUNT(*) AS totalVote, name FROM Votes JOIN Politicans ON Politicans.id = Votes.politicianId WHERE politicianId = (SELECT  id FROM Politicans WHERE name = 'Olympia Snowe')`,(err,data) =>{
    if(err) {
        console.log('==error==',err)
    } else {
        console.table(data)
    }
})


db.all(`SELECT COUNT(*) AS totalVote,name FROM Votes JOIN Politicans ON Politicans.id = Votes.politicianId WHERE name LIKE 'Adam%' GROUP BY name`,(err,data) =>{
    if(err) {
        console.log('==error==',err)
    } else {
        console.table(data)
    }
})

db.all(`SELECT COUNT(*) AS totalVote,name,party,location FROM Votes JOIN Politicans ON Politicans.id = Votes.politicianId GROUP BY name ORDER BY totalVote DESC LIMIT 3`,(err,data) =>{
    if(err) {
        console.log('==error==',err)
    } else {
        console.table(data)
    }
})

db.all(`SELECT * FROM Votes JOIN Voters ON Votes.voterId = Voters.id WHERE politicianId IN (SELECT id FROM Politicans WHERE name = 'Olympia Snowe')`,(err,data) =>{
    if(err) {
        console.log('==error==',err)
    } else {
        console.table(data)
    }
})